# Conference Explorer Web

A Next.js 16 application with PostgreSQL (pgvector), Drizzle ORM, and feature-flag based folder structure.

## Requirements

- **Node.js**: >= 20.0.0
- **Docker**: >= 20.x
- **Docker Compose**: >= 2.x
- **pnpm**: >= 8.x (recommended) or npm/yarn

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Install dependencies
pnpm install
```

### 2. Environment Setup

Copy the example environment file and customize if needed:

```bash
cp .env.example .env.local
```

The default values in `.env.local` are:

```
DATABASE_URL=postgresql://user:password@localhost:5432/conference_db
NEXT_PUBLIC_APP_URL=http://localhost:3000
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=conference_db
POSTGRES_PORT=5432
```

### 3. Development Setup

#### Option A: Using Docker (Recommended)

Start the development environment with PostgreSQL:

```bash
./scripts/dev.sh
```

This script will:

1. Start PostgreSQL with pgvector extension via Docker Compose
2. Wait for PostgreSQL to be ready
3. Run database migrations (`drizzle-kit push`)
4. Start the Next.js development server

#### Option B: Local Development

If you have PostgreSQL installed locally:

```bash
# Start PostgreSQL manually or via Homebrew
# Then run migrations
npx drizzle-kit push

# Start development server
npm run dev
```

### 4. Database Seeding

Seed the database with sample data using either of the following commands:

```bash
# Loads environment variables via dotenvx and runs the seed command
./scripts/seed.sh

# Or directly
pnpm seed
```

The seeding script generates 30 speakers, 100 conferences, and the related tag/speaker connections via Drizzle. Because the shell script invokes `pnpm run seed` through `dotenvx`, make sure your database connection values are available in `.env.local` before running it.

## Project Structure

```
conference-explorer-web/
├── app/                           # Next.js App Router pages
├── entities/                      # Domain entities (API, types, schemas)
├── features/                      # Feature modules (components, ui)
├── shared/                        # Shared utilities (db, heroui, nuqs)
├── widgets/                       # Page widgets
├── scripts/                       # Dev, prod, seed scripts
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
├── seed.ts
└── .env.local
```

### Architecture Pattern

- **entities/** - Domain layer (business logic, types, API functions)
- **features/** - Feature modules (components, hooks, utils)
- **shared/** - Cross-cutting concerns (DB, UI, utilities)
- **widgets/** - Page-level compositions

## Available Scripts

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start development server        |
| `npm run build`     | Build for production            |
| `npm run start`     | Start production server         |
| `npm run lint`      | Run ESLint                      |
| `npm run db:push`   | Push schema changes to database |
| `npm run db:studio` | Open Drizzle Studio             |
| `npm run seed`      | Seed database with dummy data   |

## Docker Commands

### Development

```bash
# Start only PostgreSQL
docker-compose up -d postgres

# View logs
docker-compose logs -f postgres

# Stop all services
docker-compose down

# Stop with volumes (clears data)
docker-compose down -v
```

### Production

```bash
# Build and start all services
./scripts/prod.sh

# Or manually
docker-compose up -d --build
```

## Technology Stack

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript 5
- **Database**: PostgreSQL 16 with pgvector
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 4
- **Component Library**: HeroUI
- **Search Params**: nuqs (type-safe URL search params)
- **Testing**: ESLint

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [HeroUI Documentation](https://www.heroui.com/docs/guide/introduction)
- [nuqs Documentation](https://github.com/47ng/nuqs)
- [Docker Documentation](https://docs.docker.com)
