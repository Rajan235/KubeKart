jest.mock("../utils/prisma/prisma", () => ({
  prisma: new (require("../utils/prisma/prisma.test").PrismaClient)(),
}));
import { execSync } from "child_process";

import jwt from "jsonwebtoken";

import { PrismaClient } from "../generated/test-prisma-client";
import { sqltag } from "../generated/test-prisma-client/runtime/library";

const prisma = new PrismaClient();

declare global {
  var signin: (role?: string) => string;
}

beforeAll(async () => {
  process.env.JWT_KEY = "NewSecretKeyForJWTSigningPurposes12345678";
  process.env.NODE_ENV = "test";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // Run migration on test DB before tests
  execSync(
    "npx prisma migrate reset --force --skip-seed --schema=prisma/test/schema.prisma"
  );
});

beforeEach(async () => {
  jest.clearAllMocks();
  const tables = await prisma.$queryRaw<Array<{ name: string }>>(
    sqltag`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`
  );

  for (const { name } of tables) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${name}";`);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

global.signin = (role = "ADMIN") => {
  const payload = {
    id: crypto.randomUUID(), // you can use faker or uuid
    email: "test@test.com",
    role,
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  return `Bearer ${token}`;
};
