FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
COPY frontend/package.json ./frontend/
COPY shared/contracts/package.json ./shared/contracts/
COPY shared/types/package.json ./shared/types/
RUN npm install

COPY shared ./shared
COPY frontend ./frontend

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV PATH=/app/node_modules/.bin:$PATH

RUN npm run build -w @repo/contracts && npm run build -w @repo/types && npm run build -w frontend_mig

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/frontend/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
