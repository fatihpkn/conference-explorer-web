#!/bin/bash
set -e

echo "🚀 Starting development environment..."


docker-compose -f docker-compose.dev.yml up -d postgres

echo "⏳ Waiting for PostgreSQL..."
until docker-compose -f docker-compose.dev.yml exec -T postgres pg_isready -U user -d conference_db 2>/dev/null; do
  sleep 1
done

echo "✅ PostgreSQL is ready!"

echo "📦 Running database migrations..."

dotenvx run -f .env.local -- npm run db:push

echo "🌱 Checking for existing data..."
COUNT=$(docker-compose -f docker-compose.dev.yml exec -T postgres psql -U user -d conference_db -t -c "SELECT COUNT(*) FROM conferences;" 2>/dev/null || echo "0")
if [ "$COUNT" -eq "0" ]; then
  echo "📊 No data found, seeding database..."
  dotenvx run -f .env.local -- npm run seed
else
  echo -e "✅ Database already has \033[32m$COUNT\033[0m conferences"
fi

echo "🛠️ Starting development server..."
dotenvx run -f .env.local -- npm run dev &

echo "📊 Starting Drizzle Studio..."
dotenvx run -f .env.local -- npm run db:studio
