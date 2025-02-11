"use client"
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginForm() {

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="h-screen flex justify-center items-center">
      {!session ? <Button onClick={() => signIn('github', { redirect: false })}>Login</Button> : <Button onClick={() => signOut()}>Logout</Button>}
    </div>
  )
}