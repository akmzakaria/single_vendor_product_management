import { PrismaClient } from "./generated/client/index.js";

const prisma = new PrismaClient();

async function main() {
  // Type-safe queries out of the box!
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
