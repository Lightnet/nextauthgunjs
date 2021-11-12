/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getProviders } from "next-auth/react";
import {createUser,verifyUser} from "../../lib/database";

export default async (req, res)=>{
  console.log("[[[=== SIGN IN ===]]]");
  //const csrfToken = await getCsrfToken({ req });
  const csrfToken = await getCsrfToken();
  console.log("csrfToken:",csrfToken);

  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }

  console.log("req.body");
  console.log(req.body);
  let userData = JSON.parse(req.body);

  if(userData.newUser){
    let data = await createUser({
      alias:userData.alias,
      passphrase:userData.passphrase
    })
    console.log("OUTPUT CREATE USER:", data);
    if(data =='FAIL'){
      return res.json({error:"FAIL"});    
    }
    if(data =='EXIST'){
      return res.json({error:"EXIST"});
    }
    return res.json(data);
  }else{
    let data = await verifyUser({
      alias:userData.alias,
      passphrase:userData.passphrase
    });
    //
    console.log('LOGIN DATA>>>>>')
    console.log(data)
    if(data){
      return res.json(data);
    }else{
      return res.json({error:"FAIL"});
    }
  }

  //res.json({id: 1, name: 'J Smith', email: 'jsmith@example.com'});
  console.log("[[[=== UNKNOWN LOGIN FAIL ===]]]")
  return res.json({error:"NOTFOUND"});
};