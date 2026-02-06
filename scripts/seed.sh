#!/bin/sh
set -e

if [ "${RUN_SEED:-true}" = "true" ]; then
  echo "🌱 Seeding database..."
  npm run seed
  echo "✅ Database seeded!"
else
  echo "⚠️ RUN_SEED=false, skipping seeding"
fi
