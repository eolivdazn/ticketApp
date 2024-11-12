"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { ticketSchema } from "@/validationsSchemas/tickets";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "./ui/input";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Ticket, User } from "@prisma/client";
import AssignTicket from "./AssignTicket";

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
    ticket? : Ticket
    users? : User[]
}

const TicketForm = ({ticket, users}:Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function onsubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError("");
      if(ticket){
        await axios.patch("/api/tickets/" + ticket.id, values);
      }else{
        await axios.post("/api/tickets", values);
      }
      setIsSubmitting(false);
      router.push("/tickets");
      router.refresh();
    } catch (error:any) {
      setError(error?.response?.data)
      setIsSubmitting(false);
      console.log(error?.response?.data);
    }
  }
  return (
    <div className="rounded-md border w-full p-4">  
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket title.." {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="description"
            defaultValue={ticket?.description}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Discription.." {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status.." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STARTED">STARTED</SelectItem>
                      <SelectItem value="OPEN">OPEN</SelectItem>
                      <SelectItem value="CLOSED">CLOSED</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority.." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">LOW</SelectItem>
                      <SelectItem value="HIGH">HIGH</SelectItem>
                      <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>        
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {ticket? "Update" : " Create" }
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error === "" ? null : error} </p>
    </div>
  );
};

export default TicketForm;
