# Use Node.js as the base image
FROM node:22-slim AS base

# Set working directory
WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Install dependencies needed for build
# We need to copy the root package.json and lockfile because it's a workspace
COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/
COPY shared/contracts/package.json ./shared/contracts/
COPY shared/types/package.json ./shared/types/

# Install dependencies
RUN npm install

# Copy source files
COPY shared/ ./shared/
COPY frontend/ ./frontend/

# Build the application
WORKDIR /app/frontend
RUN npm run build

# Production stage
FROM node:22-slim AS runner

# Install curl for healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the built output from the build stage
COPY --from=base /app/frontend/.output ./.output

# Expose the port the app runs on
EXPOSE 5173

# Set environment variables

ENV NODE_ENV=production
ENV PORT=5173

# Start the server
CMD ["node", ".output/server/index.mjs"]
