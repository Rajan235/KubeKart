// global-setup.ts
import { execSync } from "child_process";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
module.exports = async () => {
  console.log(
    "🔁 [globalSetup] Resetting PostgreSQL test database once before all test suites..."
  );
  process.env.JWT_KEY = "NewSecretKeyForJWTSigningPurposes12345678";
  process.env.NODE_ENV = "test";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  execSync("npx prisma db push --force-reset --schema=prisma/schema.prisma", {
    stdio: "inherit",
    env: process.env,
  });
};
