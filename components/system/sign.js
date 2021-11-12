/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession, signOut, signIn } from "next-auth/react";
import Link from 'next/link';

export default function Sign() {
  const {data: session, status} = useSession();
  //console.log("[[[[[[session");
  //console.log(session);
  if (status === "authenticated") {
    return (<>
    <button onClick={() => signOut()}>Sign out</button>
    </>);
  }
  return (<>
    <button onClick={() => signIn()}>Sign in</button><span> | </span>
    <Link href="/auth/signup">Sign Up</Link>
  </>);
}