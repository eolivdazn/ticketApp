import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function beforeAll() {
  try {
    await prisma.ticket.deleteMany({});
    await prisma.user.deleteMany({});
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  // Seed users
  const user1 = await prisma.user.upsert({
    where: { username: "john_doe" },
    update: {},
    create: {
      name: "John Doe",
      username: "john_doe",
      password: await bcrypt.hash("body.password", 10),
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const techUser = await prisma.user.upsert({
    where: { username: "jane_tech" },
    update: {},
    create: {
      name: "Jane Tech",
      username: "jane_tech",
      password: await bcrypt.hash("body.password", 10),
      role: "TECH",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { username: "admin_user" },
    update: {},
    create: {
      name: "Admin User",
      username: "eterra1",
      password: await bcrypt.hash("123", 10),
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Seed tickets
  await prisma.ticket.createMany({
    data: [
      {
        title: "Fix login issue",
        description: "Users are experiencing issues logging in",
        status: "OPEN",
        priority: "HIGH",
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedToUserId: techUser.id,
      },
      {
        title: "Update privacy policy",
        description: "Update the website privacy policy to comply with GDPR",
        status: "STARTED",
        priority: "MEDIUM",
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedToUserId: adminUser.id,
      },
      {
        title: "Add new feature",
        description: "Develop a new feature for user profile customization",
        status: "OPEN",
        priority: "LOW",
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedToUserId: null,
      },
      {
        title: "Database optimization",
        description: "Optimize database queries for faster loading times",
        status: "CLOSED",
        priority: "HIGH",
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedToUserId: techUser.id,
      },
      {
        title: "Bug in registration flow",
        description: "New users are unable to register",
        status: "STARTED",
        priority: "HIGH",
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedToUserId: techUser.id,
        id: 1
      },
    ],
  });
}
beforeAll()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
