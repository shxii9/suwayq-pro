
import { cookies } from "next/headers";

export function getSession() {
  return cookies().get("session")?.value || null;
}
