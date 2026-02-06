#!/bin/bash
set -e

echo "🚀 Starting production environment..."

dotenvx run -f .env -f .env.production --overload -- docker-compose up -d --build

echo "✅ Production environment started!"
