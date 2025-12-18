
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function requireAdmin() {
  const id = cookies().get("session")?.value;
  if (!id) throw new Error("UNAUTHORIZED");

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.role !== "ADMIN") throw new Error("FORBIDDEN");

  return user;
}
