import StatusFilter from "@/components/StatusFilter";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import DataTable from "./DataTable";
import { Role } from "@prisma/client";
import Prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

export interface searchParams {
  // page: string;
  role: Role;
  username: string;
  name: string;
  orderBy: typeof Users;
}

const Users = async ({ searchParams }: { searchParams: searchParams }) => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
   return <><p className="text-destructive">Admin access</p></>
  }

  const users = await Prisma.user.findMany();
  return (
    <div>
      <div className="flex gap-2">
        <Link
          href="/users/new"
          className={buttonVariants({ variant: "default" })}
        >
          New user
        </Link>
        {/* <StatusFilter/> */}
      </div>
      <DataTable users={users} searchParams={searchParams} />
    </div>
  );
};

export default Users;
