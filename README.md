# Scenelines: Utility library for rendering lines of scenes

This library provides a very simple API to register a set of scene files hosted in a specified folder and connect such scenes with each other as a line. Looping is allowed by configuration.

```
npm run build
```

or

```
yarn build
```

to bundle your application.


## To watch

```
npm run watch
```


## Example

```javascript
//check the /test/scenelines-test.js file and other files in the /test/ folder
import { setup_scenes } from "../dist/scenelines";
import * as scenes_files from "./scenes";       //THIS REQUIRES YOU TO BUILD YOUR APP USING THE "babel-plugin-import-directory" WEBPACK PLUGIN

setup_scenes({
    config_path: '/test/config.json',
    scenes_files
}).then((result) => {
    console.info("SCENES SETUP DONE!", result);
    const {config, scenes_array} = result;

    scenes_array.forEach((sc, i) => {
        setTimeout(() => sc.API.start(config), 1000*i);
        if (i === scenes_array.length - 1) {
            setTimeout(() => {
                sc.API.stop(config);
                console.info("ALL SCENES EXECUTED" +  (config.scenes_loop ? " (Loop would start again here)" : ""));
            }, 2000*i);
        }
    });    
});
```

## Configuration
```javascript
{
    "scenes_loop": true,           //it will make a loop of scenes
    "_FE_DEBUG_": false            //this shows more console info
    "long_press_time": 4000,       //overwrites the default of 3000ms that's the time you should keep the button 
                                   //pressed in order to force the execution of the registered listener 
                                   //despite of any set delay
    "click_press_interval": 1000,  //the interval time (1000ms default) used to check the time passed from 
                                   //mousedown to the current time. A longer time causes the any possible 
                                   //click to be recognized in a less reactive way (e.g. to avoid spurious clicks you 
                                   //should consider to use 1sec or more)
    "scenes": {                    //an object with the scenes names. Each one is a filename in the scenes folder
        "0": "s1",
        "1": "s2"
    }
}
```

Each file in the scenes folder must export an object as follows:
```javascript
//e.g. check the /test/scenes files as examples
export const API = {
    init: (config) => {
        /* init code, (if defined) this is called BY THE scenelines initialization process! */
        /* a reference to the input config is given to each scene in this function */
    },
    start: (prev, succ) => {
        /* logic to let the scene start */
        /* prev and succ are references to previous and successive scenes (with loop management) */
    },
    stop: (prev, succ) => {
        /* logic to let the scene stop */
        /* prev and succ are references to previous and successive scenes (with loop management) */
    }
};
```


## To test
Simply exec a web server pointing in the root folder and the open the /test subpath. (An example using the http-server simple webserver for node follows):

```bash
hs . -o /test/
```

## Warning
You are expected to build your application with the "babel-plugin-import-directory" webpack plugin. To do so:

```javascript
//package.json
{
    "devDependencies": {
        "babel-plugin-import-directory": "*"
    }
}
```

```javascript
//webpack.config.js
module.exports = {
    //...
    module: {
        //...
        rules: [
            //...
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
                options: {
                plugins: ["import-directory"]
                }
            },
            //...
        ]
    }
}
```

```javascript
//Your source code
import * as scenes_files from "./scenes"; 

//...

setup_scenes({
    config_path: "...",
    scenes_files
}).then((res) => {
    //...
});
```