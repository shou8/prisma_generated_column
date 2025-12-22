import { prisma } from "../lib/prisma";

const main = async () => {
  await prisma.user.create({
    data: { familyName: "yamada", givenName: "taro" },
  });

  const users = await prisma.user.findMany();

  console.log(users);
};

main().then(async () => {
  await prisma.$disconnect();
});
