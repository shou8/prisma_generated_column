import { prisma } from "../lib/prisma";

const main = async () => {
  await prisma.log.createMany({
    data: [
      { id: "1", message: {} },
      { id: "2", message: { user_id: "xxx" } },
      { id: "3", message: { user_id: "yyy" } },
      { id: "4", message: { other_id: "zzz" } },
      { id: "5", message: { user_id: "xxx" } },
    ],
    skipDuplicates: true,
  });

  const logs = await prisma.log.findMany({ where: { userId: "xxx" } });
  console.log("logs with userId=xxx:", logs);
};

main().then(async () => {
  await prisma.$disconnect();
});
