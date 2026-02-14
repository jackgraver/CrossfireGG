# ---------------------
# Base
# ---------------------
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ---------------------
# Dependencies
# ---------------------
FROM base AS deps
COPY package.json package-lock.json ./
COPY backend/package.json backend/
COPY shared/contracts/package.json shared/contracts/
COPY shared/types/package.json shared/types/
RUN npm install

# ---------------------
# Build
# ---------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY backend backend
COPY shared shared

# Build shared packages first
RUN npx tsc -b shared/contracts --clean && npx tsc -b shared/contracts && npx tsc -b shared/types --clean && npx tsc -b shared/types

# Now build backend
# RUN npx tsc -b backend --clean && npx tsc -b backend
RUN npm run build -w backend

# 4. Runtime
FROM base AS runner

# Install curl for healthchecks
RUN apk add --no-cache curl

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy the built backend, shared packages, and node_modules
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/shared/types ./shared/types
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

# Start the backend server
CMD ["node", "backend/dist/index.js"]
