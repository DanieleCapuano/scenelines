import { setup_scenes } from "../dist/scenelines";
import * as scenes_files from "./scenes";

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