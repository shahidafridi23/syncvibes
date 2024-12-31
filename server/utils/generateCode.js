import prisma from "../db/db.config.js";

const generateCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 36);
    code += characters[randomIndex];
  }
  return code;
};

export const generateUniqueCode = async () => {
  let isUnique = false;

  let code;

  while (!isUnique) {
    code = generateCode();

    const dbCode = await prisma.room.findFirst({
      where: { code },
      select: { code: true },
    });

    if (!dbCode) {
      isUnique = true;
    }
  }

  return code;
};
