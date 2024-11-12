import options from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/prisma/db'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import React from 'react'

const UserForm = dynamic(()=> import("@/components/UserForm"),{
    ssr: false
})

interface Props {
    params: {id: string}
}

const EdtiUser = async ({params}:Props) => {
  const session = await getServerSession(options);

  if (session?.user.role !== "ADMIN") {
   return <><p className="text-destructive">Admin access</p></>
  }

const user = await prisma.user.findUnique({where:{ id: parseInt(params.id)}})

if(!user){
    return <p className="text-destructive">User not found</p>
}
user.password = ''
  return (
    <UserForm User={user} />
  )
}

export default EdtiUser