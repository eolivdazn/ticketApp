"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { userSchema } from "@/validationsSchemas/users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
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
import { User } from "@prisma/client";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  User?: User;
}

const UserForm = ({ User }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onsubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsSubmitting(true);
      setError("");
      if (User) {
        await axios.patch("/api/users/" + User.id, values);
      } else {
        await axios.post("/api/users", values);
      }
      setIsSubmitting(false);
      router.push("/users");
      router.refresh();
    } catch (error:any) {
      setError(error?.response?.data.message)
      setIsSubmitting(false);
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
            name="name"
            defaultValue={User?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input placeholder="Name.." {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="username"
            defaultValue={User?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User username</FormLabel>
                <FormControl>
                  <Input placeholder="Username.." {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            defaultValue={User?.password}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={User ? false : true}
                    placeholder="Password.."
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={User?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl id="role">
                      <SelectTrigger>
                        <SelectValue placeholder="role.." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TECH">TECH</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="USER">USER</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="flex w-full space-x-4"></div>
          <Button type="submit" disabled={isSubmitting}>
            {User ? "Update" : " Create"}
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
};

export default UserForm;
