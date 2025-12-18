
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function requireUser() {
  const userId = getSession();
  if (!userId) return null;

  return prisma.user.findUnique({ where: { id: userId } });
}

export async function requireAdmin() {
  const userId = getSession();
  if (!userId) return null;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.role !== "ADMIN") return null;

  return user;
}
