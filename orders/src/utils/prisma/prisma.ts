import { PrismaClient } from "@prisma/client"; // normal schema

// production.ts
// import { PrismaClient } from "../generated/prod-client";
//import { PrismaClient } from "../../../prisma/generated/test-client";

// test.ts
// prisma.ts

// let prisma: any;

// if (process.env.NODE_ENV === "test") {
//   const { PrismaClient } = require("../../../prisma/generated/test-client");
//   prisma = new PrismaClient();
// } else {
//   const { PrismaClient } = require("../../../prisma/generated/prod-client");
//   prisma = new PrismaClient();
// }

// export { prisma };

// const prismaPromise = getPrismaClient();

// export { prismaPromise as prisma };
//xport const prisma: PrismaClient = await getPrismaClient();
export const prisma = new PrismaClient();
