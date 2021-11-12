/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/vercel/next.js/issues/30491
// https://gun.eco/docs/shim.js

import { useState, useEffect } from 'react';
//import Gun from '@/gun/gun';
//import Gun from 'gun/gun';
//import Gun from '@gun';
//var Gun = require('gun/gun');

export default function TestDB({props}){

  //const [data, setData] = useState('text');
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
    if((gun!=null)&&(isConnected==false) ){
      /*
      gun.on('hi', peer => {//peer connect
        //console.log('connect peer to',peer);
        console.log('peer connect!');
        setIsConnected(true);
      });
      gun.on('bye', (peer)=>{// peer disconnect
        //console.log('disconnected from', peer);
        console.log('disconnected from peer!');
      });
      */
    }
  },[gun]);

  //once init
  useEffect(async() => {
    console.log("[[[ === MOUNT === ]]]");
    //let rep = await fetch('api/gun');
    //console.log(rep);
    //let data = await rep.json();
    //console.log(data);
    //let _gun = Gun({raddisk:false, peers:['http://localhost:3000/api/restgun']});
    //let _gun = Gun('http://localhost:3000/api/restgun');
    //setGun(_gun);
  },[]);

  async function putDB(){
    let res = await fetch('api/gun?key=testkey',{
      method:'POST',
      body: JSON.stringify({hello:'world'})
    });
    let data = await res.json();
    console.log(data);
  }

  async function getDB(){
    console.log("get");
    let res = await fetch('api/gun?key=testkey&value=hello',{
      method:'GET'
    });
    let data = await res.json();
    console.log(data);
  }

  async function listDB(){
    console.log("map")
  }

  function gunAPI(){
    /*
    console.log("gun url?")
    let _gun = Gun('http://localhost:3000/api/restgun');
    */
  }

  async function gunAPI(){

    console.log("gun url?")
    let rep = await fetch('api');
    let data = await rep.json();
    console.log(data);
  }

  return(<>
    <div>
      
      <button onClick={putDB}> Put </button>
      <button onClick={getDB}> Get </button>
      
    </div>
  </>)
}
/*
<button onClick={listDB}> List </button>
      <button onClick={gunAPI}> gun connect </button>

      <button onClick={gunAPI}> gun put </button>
      <button onClick={gunAPI}> gun get </button>
<label>Test DB {data}</label>
*/