import { prisma } from "../prisma/prisma";

export const resetTestDB = async () => {
  const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  `;

  for (const { table_name } of tables) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${table_name}" RESTART IDENTITY CASCADE;`
    );
  }
};
