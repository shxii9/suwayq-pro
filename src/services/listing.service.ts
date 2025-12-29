import { prisma } from "@/lib/prisma";

export const ListingService = {
  async getAllActive() {
    return await prisma.listing.findMany({ where: { status: "ACTIVE" }, orderBy: { createdAt: "desc" } });
  },
  async deleteAsAdmin(id: string) {
    return await prisma.listing.delete({ where: { id } });
  }
};
