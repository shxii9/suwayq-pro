import fs from "fs";

const dir = "src/app/api/dashboard/stats";
fs.mkdirSync(dir, { recursive: true });

const content = `
import { prisma } from "@/lib/db";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(
  async () => {
    const users = await prisma.user.count();
    const listings = await prisma.listing.count();
    const latestListings = await prisma.listing.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return {
      users,
      listings,
      latestListings,
    };
  },
  { auth: true, admin: true }
);
`;

fs.writeFileSync(dir + "/route.ts", content);
console.log("📊 Dashboard stats API created");
