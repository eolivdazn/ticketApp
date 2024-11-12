"use client";
import React, { use, useState } from "react";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Ticket, User } from "@prisma/client";
import axios from "axios";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { ticketSchema } from "@/validationsSchemas/tickets";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { userSchema } from "@/validationsSchemas/users";

// type UserFormData = z.infer<typeof userSchema>;

interface Props {
  ticket: Ticket;
  users: User[];
}

const AssignTicket = ({ users, ticket }: Props) => {
  const [isAssignTicket, setAssignTicket] = useState(false);
  const [error, setError] = useState("");

  const assginTcket = async (userid: string) => {
    setError("false");
    setAssignTicket(true);

    await axios
      .patch(`/api/tickets/${ticket.id}`, {
        ...ticket,
        assignedToUserId: userid === "0" ? null : parseInt(userid),
      })
      .catch(() => {
        setError("Unable to assign");
      });
    setAssignTicket(false);
  };

  return (
    <div>
        Ticket assign:
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || "0"}
        onValueChange={assginTcket}
        disabled={isAssignTicket}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Users.."
            defaultValue={ticket.assignedToUserId?.toString() || "0"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassign</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssignTicket;
