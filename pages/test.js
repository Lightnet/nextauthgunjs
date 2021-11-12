/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import Sign from "../components/system/sign";
//import TestDB from "../components/database/test";
import Link from "next/link";
import { useEffect } from "react";
import getDB from "../lib/getDB";

function Page() {

  useEffect(async() => {
    let db = await getDB();
    console.log("db====================")
    console.log(db);
    if(db.getText() == 'beta'){
      db.setText('bets');
    }else{
      db.setText('beta');
    }
    
  }, []);

  return (<>
    <div>Welcome to Next.js!</div>
    <Link href="/"> Home </Link>
    <Link href="/gun"> Gun </Link>
    <Link href="/test"> Test </Link>
  </>)
}

export default Page