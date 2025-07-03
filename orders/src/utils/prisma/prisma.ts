// import { PrismaClient as ProdClient } from "@prisma/client";
// import { PrismaClient as TestClient } from "../../generated/test-prisma-client";

// const isTest = process.env.NODE_ENV === "test";

// export const prisma = isTest ? new TestClient() : new ProdClient();
// src/utils/prisma/prisma.ts
import { PrismaClient } from "@prisma/client"; // normal schema

export const prisma = new PrismaClient();
