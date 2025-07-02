import { PrismaClient } from "@prisma/client";
type PrismaTable = keyof PrismaClient;

export async function updateWithVersion<
  T extends PrismaTable,
  K extends keyof PrismaClient[T]
>(
  prisma: PrismaClient,
  table: T,
  id: string,
  currentVersion: number,
  updateData: Record<string, any>
): Promise<boolean> {
  const result = await (prisma[table] as any).updateMany({
    where: {
      id,
      version: currentVersion,
    },
    data: {
      ...updateData,
      version: { increment: 1 },
    },
  });
  return result.count === 1;
}
