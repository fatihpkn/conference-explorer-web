#!/bin/bash
set -e

echo "🚀 Starting production environment..."

dotenvx run -- docker-compose up -d --build

echo "✅ Production environment started!"
