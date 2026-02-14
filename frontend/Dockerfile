FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

FROM base AS deps
COPY package.json package-lock.json tsconfig.json ./
COPY frontend/package.json ./frontend/
COPY shared/contracts/package.json ./shared/contracts/
COPY shared/types/package.json ./shared/types/
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json tsconfig.json ./
COPY shared ./shared
COPY frontend ./frontend

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build -w @repo/contracts && npm run build -w @repo/types
RUN npm run build -w frontend_mig

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5173

COPY --from=builder /app/frontend/.output ./.output

EXPOSE 5173
CMD ["node", ".output/server/index.mjs"]
