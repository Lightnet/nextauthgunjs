/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
// https://javascript.info/promise-basics
import crypto from 'crypto';

import Ajv from 'ajv';
import jwt from 'jsonwebtoken';

import schema_user from "./schema/user";
import { nanoid16 } from './helper';

import Gun from "gun";

var secret = process.env.SECRET || "secret";

var gun;
var ajv;

if(!gun){
  gun = global.gun;
}
if(!ajv){
  ajv = global.ajv;
}

function init(){
  if(!gun){
    console.log("INIT GUN");
    gun=Gun();
    global.gun = gun;
    ajv = new Ajv({useDefaults: true});
    //console.log(schema_user);
    ajv.addSchema(schema_user, "user");
    global.ajv = ajv;
  }else{
    console.log("REUSE GUN");
  }
}
init();

export default gun;

function checkUserNameExist(user,username){
  return new Promise((resolve, reject) => {
    console.log('Initial');
    //note it take a while to list all user loop since there no array limit
    user.map().once(function(value0, key0) {
      console.log('>>>');
      //console.log(key0, value0)
      //console.log("value0", value0);
      //console.log("key0", key0);
      if(value0.alias == username){
        resolve(key0);
        return;  
      }
    })
    setTimeout(() =>{
      console.log("USER CHECKS ...5 seconds passed");
      resolve(null);
    },5*1000)//5 seconds passed
    //resolve();
  });
}

export async function createUser(args){
  //console.log(gun);
  if(!gun){
    init();
    console.log("GUN NULL!")
  }
  // need to fix this later...
  let username = args.alias || "guest";
  let passphrase = args.passphrase || "guest";
  let User = gun.get('User');

  let rs = await checkUserNameExist(User, username);
  console.log("rs");
  console.log(rs);

  let userid = nanoid16();

  let user={
    id:userid,
    alias: username,
    passphrase: passphrase,
  }

  let validate = ajv.getSchema("user");

  if(rs==null){
    console.log('CREATING!')
    if(validate(user)){
      console.log("PASS");
      console.log(user);
      let today = new Date();
      let exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      user.salt = crypto.randomBytes(16).toString('hex');
      user.hash = crypto.pbkdf2Sync(passphrase, user.salt, 10000, 512, 'sha512').toString('hex');

      let token = jwt.sign({
        id: userid,
        name: username,
        exp: parseInt(exp.getTime() / 1000),
        }, secret);

      user.token = token;

      User.get(userid).put(user,function(ack){
        //console.log(ack);
      });
      //return 'CREATED';
      return {
        id:userid
        , name:username
        , role:'USER'
        , token:token
      }

    }else{
      return 'FAIL'; 
    }
  }else{
    console.log('EXIST!')
    return 'EXIST';
  }
  return null;
}

function getUserPassphrase(user,username){
  return new Promise((resolve, reject) => {
    console.log('Initial');
    //note it take a while to list all user loop since there no array limit
    user.map().once(function(value0, key0) {
      console.log('>>>');
      //console.log(key0, value0)
      //console.log("value0", value0);
      //console.log("key0", key0);
      if(value0.alias == username){
        resolve({id:value0.id,role:value0.role,hash:value0.hash,salt:value0.salt});
        return;  
      }
    })
    setTimeout(() =>{
      console.log("USER CHECKS ...5 seconds passed");
      resolve(null);
    },5*1000)//5 seconds passed
    //resolve();
  });
}

export async function verifyUser(args){
  //console.log(gun);
  if(!gun){
    init();
    console.log("GUN NULL!")
  }
  // need to fix this later...
  let username = args.alias || "guest";
  let passphrase = args.passphrase || "guest";
  let User = gun.get('User');

  let isHash = await getUserPassphrase(User,username);
  if(isHash){
    console.log(isHash);
    let hash = crypto.pbkdf2Sync(passphrase, isHash.salt, 10000, 512, 'sha512').toString('hex');
    if(hash == isHash.hash){
      console.log("PASS LOGIN");

      let today = new Date();
      let exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      let token = jwt.sign({
        id: isHash.id,
        name: username,
        exp: parseInt(exp.getTime() / 1000),
        }, secret);

      User.get(isHash.id).put({token: token});

      return {
        id:isHash.id
        , name: username
        , role: isHash.role
        , token: token
      };

    }else{
      console.log("FAIL LOGIN");
      return null;
    }
  }else{
    console.log('FAIL HASH')
    return null;
  }
  return null;
}








