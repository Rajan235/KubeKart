// jest.mock("../utils/prisma/prisma", () => ({
//   prisma: new (require("../utils/prisma/prismaTestUtils").PrismaClient)(),
// }));
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { execSync } from "child_process";

import jwt from "jsonwebtoken";

import { prisma } from "../utils/prisma/prisma";

declare global {
  var signin: (role?: string) => string;
}

// beforeAll(async () => {
//   process.env.JWT_KEY = "NewSecretKeyForJWTSigningPurposes12345678";
//   process.env.NODE_ENV = "test";
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//   console.log("🔁 Resetting PostgreSQL test database...");
//   execSync(
//     "npx prisma migrate reset --force --skip-seed --schema=prisma/prod/schema.prisma",
//     {
//       stdio: "inherit",
//       env: process.env,
//     }
//   );
//   // Run migration on test DB before tests
//   // Reset DB schema using test schema
//   // execSync(
//   //   "npx prisma migrate reset --force --skip-seed --schema=prisma/test/schema.prisma",
//   //   { stdio: "inherit" }
//   // );
//   // execSync(
//   //   "npx prisma db push --force-reset --schema=prisma/test/schema.prisma",
//   //   { stdio: "inherit" }
//   // );
// });
// beforeAll(async () => {
//   process.env.JWT_KEY = "NewSecretKeyForJWTSigningPurposes12345678";
//   process.env.NODE_ENV = "test";
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//   console.log("🔁 Resetting PostgreSQL test database...");

//   // execSync(
//   //   "npx prisma migrate reset --force --skip-seed --schema=prisma/prod/schema.prisma",
//   //   {
//   //     stdio: "inherit",
//   //     env: {
//   //       ...process.env,
//   //       DATABASE_URL: process.env.DATABASE_URL!,
//   //     },
//   //   }
//   // );
//   // execSync("npx prisma migrate reset --force --skip-seed", {
//   //   stdio: "inherit",
//   //   env: process.env,
//   // });
//   execSync("npx prisma db push --force-reset --schema=prisma/schema.prisma", {
//     stdio: "inherit",
//     env: process.env,
//   });
// });

// beforeEach(async () => {
//   jest.clearAllMocks();
//   const tables = await prisma.$queryRaw<Array<{ name: string }>>(
//     sqltag`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`
//   );

//   for (const { name } of tables) {
//     await prisma.$executeRawUnsafe(`DELETE FROM "${name}";`);
//   }
// });
beforeEach(async () => {
  jest.clearAllMocks();

  // const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
  //   SELECT table_name
  //   FROM information_schema.tables
  //   WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  // `;

  // for (const { table_name } of tables) {
  //   await prisma.$executeRawUnsafe(
  //     `TRUNCATE TABLE "${table_name}" RESTART IDENTITY CASCADE;`
  //   );
  // }
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

// afterEach(async () => {
//   const tables = ["User", "Order", "Product"]; // replace with your models
//   for (const table of tables) {
//     await prisma.$executeRawUnsafe(
//       `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`
//     );
//   }
// });

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
