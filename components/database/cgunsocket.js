/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/vercel/next.js/issues/30491
// https://gun.eco/docs/shim.js

import { useState, useEffect } from 'react';
//import Gun from '@/gun/gun';
import Gun from 'gun';

export default function TestDB({props}){

  const [data, setData] = useState('text');
  const [gun, setGun] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    return function cleanup() {
      console.log("[[[ === UNMOUNT === ]]]")
      //gun.off();
      setGun(null);
    }
  },[]);

  //watch var gun change is set
  useEffect(() => {
    if( (gun!=null)&&(isConnected==false) ){
      gun.on('hi', peer => {//peer connect
        //console.log('connect peer to',peer);
        console.log('peer connect!');
        setIsConnected(true);
      });
  
      gun.on('bye', (peer)=>{// peer disconnect
        //console.log('disconnected from', peer);
        console.log('disconnected from peer!');
      });
    }
  },[gun]);

  //once init
  useEffect(async() => {
    console.log("[[[ === MOUNT === ]]]");
    let rep = await fetch('api/gun');
    console.log(rep);
    //let data = await rep.json();
    //console.log(data);

    let _gun = Gun({raddisk:false, peers:['http://localhost:3000/gun']});
    setGun(_gun);

  },[]);

  async function putDB(){
    console.log("put");
    console.log(gun);
    gun.get('test').put({ "gun": "d" },function(ack){
      console.log(ack)
    });
  }

  async function getDB(){
    console.log("get");
    gun.get('test').get('gun').once((data) => {
      console.log(data);
    })
  }

  async function listDB(){
    console.log("map")
  }

  return(<>
    <div>
      <label>Test DB {data}</label>
      <button onClick={putDB}> Put </button>
      <button onClick={getDB}> Get </button>
      <button onClick={listDB}> List </button>
    </div>
  </>)
}