import { Priority } from "@prisma/client";
import { Flame } from "lucide-react";
import React from "react";

interface Props {
  priority: Priority;
}

const prioritysMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
  HIGH: { label: "HIGH", level: 3 },
  LOW: { label: "LOW", level: 1 },
  MEDIUM: { label: "MEDIUM", level: 2 },
};

const TicketPriority = ({ priority }: Props) => {
  return <> 
  <Flame className={`${prioritysMap[priority].level >= 1 ? "text-red-500":"text-muted"}`}/>
  <Flame className={`${prioritysMap[priority].level >= 2 ? "text-red-500":"text-muted"}`}/>
  <Flame className={`${prioritysMap[priority].level >= 3 ? "text-red-500":"text-muted"}`}/>
    </>;
};

export default TicketPriority;
