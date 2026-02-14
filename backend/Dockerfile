FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

FROM base AS deps
COPY package.json package-lock.json tsconfig.json ./
COPY backend/package.json ./backend/
COPY shared/contracts/package.json ./shared/contracts/
COPY shared/types/package.json ./shared/types/
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json tsconfig.json ./
COPY shared ./shared
COPY backend ./backend

RUN npm run build -w @repo/contracts && npm run build -w @repo/types
RUN npm run build -w cf-backend

FROM base AS runner
WORKDIR /app
RUN apk add --no-cache curl
ENV NODE_ENV=production
ENV PORT=8080

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/
COPY --from=builder /app/shared/contracts/dist ./shared/contracts/dist
COPY --from=builder /app/shared/contracts/package.json ./shared/contracts/
COPY --from=builder /app/shared/types/dist ./shared/types/dist
COPY --from=builder /app/shared/types/package.json ./shared/types/
COPY package.json ./

EXPOSE 8080
CMD ["node", "backend/dist/index.js"]
