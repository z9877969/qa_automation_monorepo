#!/usr/bin/env bash
set -e

echo "🚀 Project Headliner — starting..."

if ! command -v docker &> /dev/null; then
  echo "❌  Docker not found. Install Docker Desktop: https://www.docker.com/products/docker-desktop"
  exit 1
fi

docker compose version &> /dev/null || {
  echo "❌  Docker Compose not found. Install Docker Desktop (includes Compose)."
  exit 1
}

docker compose up --build

echo ""
echo "✅  All services are up:"
echo "   Frontend → http://localhost:5173"
echo "   Backend  → http://localhost:5000"
echo "   MySQL    → localhost:3306"
