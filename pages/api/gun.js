/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.developintelligence.com/blog/2017/07/intro-decentralized-databases-gun-js/
// https://github.com/noctisatrae/gunpoint/blob/master/src/index.js
// https://stackoverflow.com/questions/46831742/how-to-use-gun-as-an-express-route

//import Gun from "gun";

export const config = {
  api: {
    bodyParser: true,
  },
};

//var gun;

import gun from "../../lib/database";

export default async (req, res)=>{
  
  console.log('API GUN');
  console.log('method',req.method);
  let test = gun.get('test');
  //console.log(req.params);
  //console.log(req.path);
  console.log(req.query);
  console.log(req.body);

  if(req.method == 'GET'){
    //console.log(req.params);
    const { key, value } = req.query;
    if(key !=null && value != null ){
      test.get(key).get(value).once(function(ack){
        console.log("tests.....")
        console.log(ack);
      })
    }
  }

  if(req.method == 'POST'){
    console.log('POST?')
    console.log(req.body);
    const { key } = req.query;
    if(key){
      let data = JSON.parse(req.body);
      test.get(key).put(data,function(ack){
        console.log(ack.ok);
      })
    }
  }
  
  res.json({message:'ERROR'});
  //res.end();
  /*
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
  */
  
};