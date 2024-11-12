import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import React from "react";
import { userSchema } from "@/validationsSchemas/users";
import  bcrypt  from "bcryptjs";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!user) {
    return NextResponse.json(
      { error: "Error not found:" + params.id },
      { status: 404 }
    );
  }

  if (body.username !== user.username) {
    const duplicate = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (duplicate) {
      return NextResponse.json({ message: "Duplicted user" }, { status: 409 });
    }
  }

  if (body?.password.length > 0) {
    body.password = await bcrypt.hash(body.password, 10);;
  }

  if(body.password === '')
  {
    delete body.password
  }
  
console.log(body,"updateTicket")
  const updateTicket = prisma.user.update({
    where: { id: user.id },
    data: { ...body },
  });

  return NextResponse.json((await updateTicket).id,{status: 200})
}

export async function DELETE(request: NextRequest,  { params }: Props) {
    // const body = await request.json();
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });
  
    if (!user) {
      return NextResponse.json(
        { error: "Error not found:" + params.id },
        { status: 404 }
      );
    }
    const deleteTicket = await prisma.user.delete({
      where: { id: parseInt(params.id) },
    });
    console.log(deleteTicket)
  
    return NextResponse.json({message: "Ticket delete"+deleteTicket.id},{status: 202})
  }