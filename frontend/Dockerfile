# 1. Base image for dependencies and build
FROM node:20-alpine AS deps
WORKDIR /app

# Install required tools
RUN apk add --no-cache libc6-compat

# Copy package files and install only deps
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install --frozen-lockfile

# 2. Build layer with source code
FROM node:20-alpine AS builder
WORKDIR /app

# Copy installed deps from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the app
COPY . .

# Generate a production build
RUN npm run build

# 3. Production runner
FROM node:20-alpine AS runner
WORKDIR /app

# Next.js needs this for standalone mode
ENV NODE_ENV production

# Copy only essential build files from previous stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose Next.js default port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]