// https://pretagteam.com/question/how-do-i-set-preload-headers-in-nextjs
// https://stackoverflow.com/questions/59474480/using-baseurl-in-jsconfig-json-not-working-with-nextjs
// https://github.com/vercel/next.js/issues/1109
// https://stackoverflow.com/questions/68467409/next-js-how-to-import-a-module-from-the-folder-outside-of-the-project
// https://github.com/amark/gun/issues/743
// 

const path = require('path');

module.exports = {
   //hmr: false,
   //target: 'serverless', // deprecated
  webpack: function(config,options) {
      console.log(options.webpack.version); // 5.63.0
      //config.cache = false;
      console.log(config);
      config.resolve.modules.push(path.resolve('./'));


      //console.log(config.resolve.alias);
      //console.log(__dirname);
      //console.log(path.join(__dirname,"node_modules/gun/gun"));
      console.log(path.resolve(__dirname,"node_modules/gun/gun"));
      Object.assign(config.resolve.alias, {//append without override current next.js config
         //react: 'preact/compat',
         //'react-dom/test-utils': 'preact/test-utils',
         //'react-dom': 'preact/compat'
         //"@/gun/*":"node_modules/gun/*" // nope
         // import Gun from 'gun/gun';
         //"gun/gun":path.join(__dirname,"node_modules/gun/gun")//work partly. full path needed. 
         //"./node_modules/gun/gun.js":path.join(__dirname,"node_modules/gun/gun.js")
         //"@gun":path.resolve(__dirname,"node_modules/gun/gun") //client gun
      });

      Object.assign(config.module, {
        //noParse:/gun\.js$/
        //noParse: /node_modules\.gun\.gun.js\.js$/
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