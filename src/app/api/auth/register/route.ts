
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, setSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hashPassword(password),
    },
  });

  setSession(user.id);
  return NextResponse.json({ user });
}
