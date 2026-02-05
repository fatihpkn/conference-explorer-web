#!/bin/bash
set -e

echo "🌱 Seeding database..."

dotenvx run -- npm run seed

echo "✅ Database seeded!"
