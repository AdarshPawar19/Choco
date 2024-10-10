"use client"
import React from 'react'
import {SessionProvider} from "next-auth/react"

//TODO:Type proper session type
type SessionProps={
    children:React.ReactNode,
    session:any
}

function AuthProvider({children  , session}:SessionProps) {
  return (
    <>
        <SessionProvider session={session}>{children}</SessionProvider>
    </>
  )
}

export default AuthProvider
