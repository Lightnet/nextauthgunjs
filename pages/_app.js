/*
  LICENSE: MIT
  Created by: Lightnet

  Note: this override the _app data set up
*/

import React, { useState, useEffect } from "react";
import { SessionProvider } from 'next-auth/react';
import { useRouter } from "next/router";
import "../styles/global.css";
//import getConfig from 'next/config';
//import { log } from "../lib/log";
// Only holds serverRuntimeConfig and publicRuntimeConfig
//const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
//console.log(serverRuntimeConfig);
//console.log(publicRuntimeConfig);
//console.log("process.env.customKey");
//console.log(process.env.customKey);
//console.log(process.env.HOST);
//console.log(process.env.NEXTAUTH_URL);

import getDB from "../lib/getDB";


export default function App({Component, pageProps}){
  //console.log("[[[=== _app.js ===]]]");
  //console.log("session: ",session);
  //log("Hello Debug???=======================================================?")
  //console.log(process.env.customKey);
  

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(async() => {
    let db = await getDB();
    console.log("db====================")
    console.log(db);
    db.setText('beta');
  }, []);

  useEffect(() => {
    //console.log("APP INIT USEDEFFECT!");
    //setLoading(true);
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
      //setLoading(true);
      //console.log("loading:",loading);
    };
    const handleComplete = (url) =>{ 
      //console.log("FINISH LOADING...");
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, []);
  
  return (    
    <SessionProvider 
      session={pageProps.session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      >
        <Component {...pageProps} />
    </SessionProvider>
  );
}
/*
function Auth({ children }) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (status === "loading") return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])

  if (isUser) {
    return children
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
*/