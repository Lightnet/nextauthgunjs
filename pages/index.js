/*
  LICENSE: MIT
  Created by: Lightnet
*/

import Sign from "../components/system/sign";
import Link from "next/link";

import getDB from "../lib/getDB";
import { useEffect } from "react";

function Page() {

  //console.log(process.env.customKey);
  useEffect(async()=>{
    let db = await getDB();
    console.log("db====index================")
    console.log(db)
  },[])

  return (<>
    <div>Welcome to Next.js!</div>
    <Link href="/"> Home </Link>
    <Link href="/gun"> Gun </Link>
    <Link href="/test"> Test </Link>
    <Sign></Sign>
  </>)
}

export default Page