import options from '@/app/api/auth/[...nextauth]/options'
import UserForm from '@/components/UserForm'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import React from 'react'

const TicketForm = dynamic(()=> import("@/components/TicketForm"),{
    ssr: false
})

const NewTicket = async () => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
   return <><p className="text-destructive">Admin access</p></>
  }
  
  return   <UserForm/>

}

export default NewTicket