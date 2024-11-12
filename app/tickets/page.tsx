import React from "react";
import Prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Paginantion from "@/components/Paginantion";
import StatusFilter from "@/components/StatusFilter";
import { object } from "zod";
import { Status, Ticket } from "@prisma/client";

export interface searchParams {
  page: string;
  status: Status;
  orderBy: keyof Ticket
}

const Tickets = async ({ searchParams }: { searchParams: searchParams }) => {
  const pageSize = 5;
  const page = parseInt(searchParams.page) || 1;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt" 

  let where = {};

  if (status) {
    where = {
      status,
    };
  } else {
    where: {
      NOT: [{ status: "CLOSED" as Status }];
    }
  }
  const ticketCount = await Prisma.ticket.count({ where });
  const tickets = await Prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: "desc"
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <div className="flex gap-2">
      <Link
        href="/tickets/new"
        className={buttonVariants({ variant: "default" })}
      >
        New ticket
      </Link>
      <StatusFilter/>
      </div>
      <DataTable tickets={tickets} searchParams={searchParams}/>
      <div>
        <Paginantion
          itemCount={ticketCount}
          pageSize={pageSize}
          currantePage={page}
        />
      </div>
    </div>
  );
};

export default Tickets;
