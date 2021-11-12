/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';

export default function component({props}){

  const [data, setData] = useState('text');

  //once init
  useEffect(() => {
    console.log('init once');
  },[]);

  return(<>
    <div>
      <label>Blank {data}</label>
    </div>
  </>)
}