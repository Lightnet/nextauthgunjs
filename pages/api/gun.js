/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.developintelligence.com/blog/2017/07/intro-decentralized-databases-gun-js/
// https://github.com/noctisatrae/gunpoint/blob/master/src/index.js
// https://stackoverflow.com/questions/46831742/how-to-use-gun-as-an-express-route

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
      // web:res.socket.server
      //, peers
      //, raddisk:false
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

    gun.get('test').put({ "gun": "d" },function(ack){
      console.log(ack)
    });

    gun.get('test').get('gun').once((data) => {
      console.log(data);
    })

    res.socket.server.gun = gun;
  }

  console.log('restgun');
  console.log('method',req.method);

  res.end();
};