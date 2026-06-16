import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

let prismaInstance: PrismaClient;

if (typeof window === "undefined") {
  // 1. Establish a native Node postgres connection pool
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  // 2. Wrap it with the required Prisma 7 Driver Adapter
  const adapter = new PrismaPg(pool);

  // 3. Pass the adapter directly into the options (Required in Prisma 7)
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
} else {
  // Graceful client fallback proxy
  prismaInstance = new Proxy({}, {
    get() {
      throw new Error("Critical: PrismaClient invoked on client side bundle.");
    },
  }) as PrismaClient;
}

export const prisma = prismaInstance;