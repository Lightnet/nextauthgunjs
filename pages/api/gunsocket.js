/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.developintelligence.com/blog/2017/07/intro-decentralized-databases-gun-js/
// https://github.com/noctisatrae/gunpoint/blob/master/src/index.js

import Gun from "gun";

export const config = {
  api: {
    bodyParser: false,
  },
};

var gun;

export default async (req, res)=>{

  if (!res.socket.server.gun) {
    console.log("SETUP GUN");
    gun = Gun({
      web:res.socket.server
      //, peers
      , raddisk:false
      //, file:'E:/srctree\threenextreact/data' //dev only
    });

    gun.on('hi', peer => {//peer connect
      //console.log('connect peer to',peer);
      console.log('peer connect!');
    });

    gun.on('bye', (peer)=>{// peer disconnect
      //console.log('disconnected from', peer);
      console.log('disconnected from peer!');
    });

    res.socket.server.gun = gun;
  }else{
    console.log("REUSED GUN");
    //gun = global.gun;
    //console.log(gun);
  }

  res.end();
};