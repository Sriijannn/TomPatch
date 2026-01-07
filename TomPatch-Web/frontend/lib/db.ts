// lib/db.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is not defined");
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const pool = new Pool({
  connectionString: url,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg(pool),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
