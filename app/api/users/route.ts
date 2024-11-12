import prisma from "@/prisma/db";
import { userSchema } from "@/validationsSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt  from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {

  const session = await getServerSession(options);
  console.log(session?.user?.role)

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({message: "Please login as admin.."}, { status: 401});
  }
  
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (duplicate) {
    return NextResponse.json({ message: "Duplicted user" }, { status: 409 });
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  body.password = hashPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  return NextResponse.json(newUser, { status: 201 });
}
