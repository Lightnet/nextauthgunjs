/*
  LICENSE: MIT
  Created by: Lightnet
*/

const UserSchema = {
  type: "object",
  properties: {
    id:{type:"string", default:""},
    alias:{type:"string"},
    hash:{type:"string", default:""},
    salt:{type:"string", default:""},
    token:{type:"string", default:""},
    role:{type:"string", default:"USER"},
    date:{type:"string", default:""}
  },
  //optionalProperties: {
    //hash:{type:"string"}
  //}
  //required: ["alias"],
  //additionalProperties: false // validate call boolean
}
export default UserSchema;