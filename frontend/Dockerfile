# Build from repo root:
# docker build -t frontend -f frontend/Dockerfile .

FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ---------------------
# Dependencies
# ---------------------
FROM base AS deps
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/
COPY shared/contracts/package.json shared/contracts/
RUN npm install

# ---------------------
# Build
# ---------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY frontend frontend
COPY shared shared

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build shared packages first
RUN npx tsc -b shared/contracts --clean && npx tsc -b shared/contracts

# Build the frontend
RUN npm run build -w frontend

# ---------------------
# Runtime
# ---------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/frontend/.output .output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
