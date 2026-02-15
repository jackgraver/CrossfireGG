#!/usr/bin/env sh
set -euo pipefail

REGISTRY="registry.digitalocean.com/crossfire-buildimages"
FRONTEND_IMAGE="cf-frontend"
BACKEND_IMAGE="cf-backend"
TAG="latest"

# ---------------------------
# Parallel builds
# ---------------------------

echo "Building images in parallel..."

(
  echo "Building frontend..."
  docker build -t ${FRONTEND_IMAGE}:${TAG} \
    --build-arg VITE_API_BASE_URL=/api \
    -f frontend/Dockerfile .
) &

(
  echo "Building backend..."
  docker build -t ${BACKEND_IMAGE}:${TAG} -f backend/Dockerfile .
) &

wait
echo "Builds complete."

# ---------------------------
# Tag images
# ---------------------------

docker tag ${FRONTEND_IMAGE}:${TAG} ${REGISTRY}/${FRONTEND_IMAGE}:${TAG}
docker tag ${BACKEND_IMAGE}:${TAG} ${REGISTRY}/${BACKEND_IMAGE}:${TAG}

# ---------------------------
# Parallel pushes
# ---------------------------

echo "Pushing images in parallel..."

docker image prune -f

docker push ${REGISTRY}/${FRONTEND_IMAGE}:${TAG} &
docker push ${REGISTRY}/${BACKEND_IMAGE}:${TAG} &

wait
echo "Done."
