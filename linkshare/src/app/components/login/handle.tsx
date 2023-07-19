"use client";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Avatar } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
// import { UserCirlceIcon } from "@heroicons/react/solid";

export default function LogBtn() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Avatar />
        <UserCircleIcon className="inline-block h-6 w-6 text-gray-400" />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
