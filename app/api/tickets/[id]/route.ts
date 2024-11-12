import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import React from "react";
import { ticketSchema } from "@/validationsSchemas/tickets";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 404 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json(
      { error: "Error not found:" + params.id },
      { status: 404 }
    );
  }
  const updateTicket = prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  });

  return NextResponse.json((await updateTicket).id,{status: 200})
}

export async function DELETE(request: NextRequest,  { params }: Props) {
    // const body = await request.json();
    const ticket = await prisma.ticket.findUnique({
      where: { id: parseInt(params.id) },
    });
  
    if (!ticket) {
      return NextResponse.json(
        { error: "Error not found:" + params.id },
        { status: 404 }
      );
    }
    const deleteTicket = await prisma.ticket.delete({
      where: { id: parseInt(params.id) },
    });
    console.log(deleteTicket)
  
    return NextResponse.json({message: "Ticket delete"+deleteTicket.id},{status: 202})
  }