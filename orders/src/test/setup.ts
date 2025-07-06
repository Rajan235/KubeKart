import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import jwt from "jsonwebtoken";

import { prisma } from "../utils/prisma/prisma";

declare global {
  var signin: (role?: string) => string;
}

beforeEach(async () => {
  jest.clearAllMocks();

  const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name NOT IN ('_prisma_migrations');
  `;

  for (const { table_name } of tables) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${table_name}" RESTART IDENTITY CASCADE;`
    );
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

global.signin = (role = "ADMIN") => {
  const payload = {
    id: crypto.randomUUID(), // you can use faker or uuid
    email: process.env.TEST_EMAIL,
    role,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  return `Bearer ${token}`;
};
