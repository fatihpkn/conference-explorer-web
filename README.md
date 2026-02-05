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

Seed the database with dummy data for development:

```bash
# Using the seed script
./scripts/seed.sh

# Or directly
npm run seed
```

This will create:

- 20 fake speakers
- 50 fake conferences

## Project Structure

```
conference-explorer-web/
├── app/
│   ├── (core)/              # Core features
│   ├── (features)/           # Feature-flagged modules
│   │   ├── _components/     # Shared components (ErrorBoundary, etc.)
│   │   ├── conferences/     # Conference feature
│   │   ├── speakers/        # Speaker feature
│   │   └── search/          # Search feature (nuqs)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── db/                   # Database layer
│       ├── schema.ts         # Drizzle schemas
│       ├── index.ts          # Database connection
│       └── types.ts          # TypeScript types
├── scripts/
│   ├── dev.sh               # Development startup script
│   ├── prod.sh              # Production startup script
│   └── seed.sh              # Database seeding script
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile               # Production Dockerfile
├── Dockerfile.dev           # Development Dockerfile
├── drizzle.config.ts        # Drizzle Kit configuration
├── seed.ts                  # Seed script
└── .env.local               # Environment variables
```

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

## Database Schema

### Conferences Table

- `id`: Serial primary key
- `name`: Conference name
- `description`: Conference description
- `location`: Conference location
- `start_date`: Start date
- `end_date`: End date
- `embedding`: Vector (1536 dimensions) for pgvector similarity search
- `created_at`: Timestamp

### Speakers Table

- `id`: Serial primary key
- `name`: Speaker name
- `bio`: Speaker biography
- `email`: Speaker email
- `created_at`: Timestamp

## Technology Stack

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript 5
- **Database**: PostgreSQL 16 with pgvector
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS 4
- **Search Params**: nuqs (type-safe URL search params)
- **Testing**: ESLint

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [nuqs Documentation](https://github.com/47ng/nuqs)
- [Docker Documentation](https://docs.docker.com)
