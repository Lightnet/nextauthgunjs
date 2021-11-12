// https://pretagteam.com/question/how-do-i-set-preload-headers-in-nextjs
// https://stackoverflow.com/questions/59474480/using-baseurl-in-jsconfig-json-not-working-with-nextjs
// https://github.com/vercel/next.js/issues/1109
// 
// 
// 

const path = require('path');

module.exports = {
   //hmr: false,
   //target: 'serverless', // deprecated
  webpack: function(config) {
      config.resolve.modules.push(path.resolve('./'));
      //console.log(config.resolve.alias);
      //console.log(__dirname);
      //console.log(path.join(__dirname,"node_modules/gun/gun"));
      Object.assign(config.resolve.alias, {//append without override current next.js config
         //react: 'preact/compat',
         //'react-dom/test-utils': 'preact/test-utils',
         //'react-dom': 'preact/compat'
         //"@/gun/*":"node_modules/gun/*" // nope
         // import Gun from 'gun/gun';
         //"gun/gun":path.join(__dirname,"node_modules/gun/gun")//work partly. full path needed. 
         "gun/gun":path.join(__dirname,"node_modules/gun/gun")
      });
      /*
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      })
      config.module.rules.push({
        test: /\.yml$/,
        use: 'raw-loader'
      })
      */
     return config
  },
  env: {
   customKey: 'my-value',
  }
}