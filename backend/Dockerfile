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
COPY shared/schemas/package.json shared/schemas/
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
RUN npm run build -w @repo/contracts
RUN npm run build -w @repo/schemas

# Now build backend
RUN npm run build -w cf-backend

# ---------------------
# Runtime
# ---------------------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

COPY --from=builder /app/backend/dist backend/dist
COPY --from=builder /app/backend/package.json backend/package.json
COPY --from=builder /app/node_modules node_modules

EXPOSE 8080
CMD ["node", "backend/dist/index.js"]
