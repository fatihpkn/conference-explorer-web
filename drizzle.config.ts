import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/shared/lib/db/schemas/*.ts",
  out: "./src/shared/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://user:password@localhost:5432/conference_db",
  },
});
