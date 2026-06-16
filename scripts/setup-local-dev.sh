#!/usr/bin/env bash
# Local dev bootstrap for CrossFire site monorepo.
# Safe to re-run: skips steps when services/files already exist.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

info() { echo "==> $*"; }
warn() { echo "!!  $*" >&2; }

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    warn "Missing required command: $1"
    exit 1
  fi
}

require_cmd node
require_cmd npm
require_cmd docker

info "Installing npm workspace dependencies..."
npm install

if [[ ! -f backend/.env ]]; then
  info "Creating backend/.env from backend/env.example"
  cp backend/env.example backend/.env
  warn "Edit backend/.env — at minimum set BETTER_AUTH_SECRET and FACEIT_* values."
else
  info "backend/.env already exists — leaving unchanged"
fi

if [[ ! -f frontend/.env ]]; then
  info "Creating frontend/.env from frontend/env.example"
  cp frontend/env.example frontend/.env
else
  info "frontend/.env already exists — leaving unchanged"
fi

info "Starting PostgreSQL (db/docker-compose.yml)..."
docker compose -f db/docker-compose.yml up -d postgres

info "Starting Redis on localhost:6379 (if not already running)..."
if docker ps --format '{{.Names}}' | grep -qx cf-redis; then
  info "cf-redis container already running"
elif docker ps -a --format '{{.Names}}' | grep -qx cf-redis; then
  docker start cf-redis
else
  docker run -d --name cf-redis -p 6379:6379 redis:7-alpine
fi

info "Waiting for PostgreSQL to accept connections..."
for i in {1..30}; do
  if docker exec CF-postgres pg_isready -U app_user -d cf-db >/dev/null 2>&1; then
    break
  fi
  sleep 1
  if [[ $i -eq 30 ]]; then
    warn "PostgreSQL did not become ready in time"
    exit 1
  fi
done

info "Pushing Drizzle schema to local database..."
npm run db:push

cat <<'EOF'

Setup complete.

Next steps:
  1. Edit backend/.env — set BETTER_AUTH_SECRET and FACEIT credentials.
     Generate secret: openssl rand -hex 64
  2. Start backend:  cd backend && npm run dev
  3. Start frontend: cd frontend && npm run dev
  4. Open http://localhost:3000

Verify:
  curl http://localhost:5000/health

Full reference: MD/local-development-setup.md
EOF
