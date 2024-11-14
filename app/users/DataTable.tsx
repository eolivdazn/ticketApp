import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { searchParams } from "./page";

interface Props {
  users: User[];
  searchParams: searchParams;
}

const DataTable = ({ users, searchParams }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link
                  href={{ query: { ...searchParams, orderBy: "username" } }}
                >
                  Username
                </Link>
                {/* {"username" === searchParams.orderBy && (
                  <ArrowDown className="inline p-1" />
                )} */}
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link href={{ query: { ...searchParams, orderBy: "name" } }}>
                    name
                  </Link>
                  {/* {"name" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )} */}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link href={{ query: { ...searchParams, orderBy: "role" } }}>
                    role
                  </Link>
                  {/* {"role" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )} */}
                </div>
              </TableHead>
              <TableHead>
              <div className="flex justify-center">
                <Link
                  href={{ query: { ...searchParams, orderBy: "createdAt" } }}
                >
                  Created At
                </Link>
                {/* {"createdAt" === searchParams.orderBy && (
                  <ArrowDown className="inline p-1" />
                )} */}
                </div>
              </TableHead>
              <TableHead>
              <div className="flex justify-center">
                <Link
                  href={{ query: { ...searchParams, orderBy: "updatedAt" } }}
                >
                  Update At
                </Link>
                {/* {"createdAt" === searchParams.orderBy && (
                  <ArrowDown className="inline p-1" />
                )} */}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              ? users.map((user) => (
                  <TableRow key={user.id}>
                    <Link href={"users/" + user.id}>
                      <TableCell>{user.username}</TableCell>
                    </Link>
                    <TableCell>
                      <div className="flex justify-center">{user.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">{user.role}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {user.createdAt.toLocaleDateString("en-PT", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {user.updatedAt.toLocaleDateString("en-PT", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
