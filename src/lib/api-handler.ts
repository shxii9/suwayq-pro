
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/roles";

export function apiHandler(
  handler,
  options = { auth: false, admin: false }
) {
  return async (req, context) => {
    try {
      if (options.auth) {
        const userId = getSession();
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
      }

      if (options.admin) {
        const admin = await requireAdmin();
        if (!admin) {
          return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
      }

      const result = await handler(req, context);
      return NextResponse.json({ success: true, data: result });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
