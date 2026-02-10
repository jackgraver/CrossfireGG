# Use Node.js as the base image
FROM node:22-slim AS base

# Set working directory
WORKDIR /app

# Install dependencies needed for build
# We need to copy the root package.json and lockfile because it's a workspace
COPY package.json package-lock.json ./
COPY frontend_mig/package.json ./frontend_mig/
COPY shared/contracts/package.json ./shared/contracts/
COPY shared/types/package.json ./shared/types/

# Install dependencies
RUN npm ci

# Copy source files
COPY shared/ ./shared/
COPY frontend_mig/ ./frontend_mig/

# Build the application
WORKDIR /app/frontend_mig
RUN npm run build

# Production stage
FROM node:22-slim AS runner

WORKDIR /app

# Copy the built output from the build stage
COPY --from=base /app/frontend_mig/.output ./.output

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the server
CMD ["node", ".output/server/index.mjs"]
