/*
  LICENSE: MIT
  Created by: Lightnet
*/

// works

// https://www.tutorialguruji.com/javascript/reusing-database-connections-with-azure-functions-using-javascript/amp/
// https://pretagteam.com/question/reusing-database-connections-with-azure-functions-using-javascript

class DBTest{
  constructor(){
    this.data="test";
  }
  setText(params) {
    this.data=params;  
  }
  getText() {
    return this.data;
  }
}

let dbInstance;

module.exports = async function() {
  console.log("CHECKING DATA...");
  if (!dbInstance) {
    console.log("INIT DATA");
    //dbInstance = "test";
    dbInstance = new DBTest();
  }else{
    console.log("reused!")
  }
  return dbInstance;
};

// function.js
/*
const getDb = require('./getDb.js');
module.exports = async function(context, trigger) {
    let db = await getDb();
    // ... do stuff with db ..
};
*/