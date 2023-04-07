import { setup_scenes, register_listener, deregister_listener } from "../dist/scenelines";
import * as scenes_files from "./scenes";

setup_scenes({
    config_path: '/test/config.json',
    scenes_files
}).then((result) => {
    console.info("SCENES SETUP DONE!", result);
    const { config, scenes_array } = result;


    //TESTING long_press_time
    let curr_i = 0,
        curr_sc = null;
    function start_sc() {
        if (!curr_sc) {
            console.info("NO MORE SCENES!");
            return;
        }
        curr_sc.API.start(config);
        curr_i++;
        exec_fn();
    }
    function exec_fn() {
        curr_sc = scenes_array[curr_i];
        if (curr_i > 0) {
            deregister_listener('listener_' + (curr_i - 1), start_sc);
        }
        register_listener('listener_' + curr_i, start_sc, 10000, config);
    }

    exec_fn();

    // scenes_array.forEach((sc, i) => {

    // setTimeout(() => sc.API.start(config), 1000*i);
    // if (i === scenes_array.length - 1) {
    //     setTimeout(() => {
    //         sc.API.stop(config);
    //         console.info("ALL SCENES EXECUTED" +  (config.scenes_loop ? " (Loop would start again here)" : ""));
    //     }, 2000*i);
    // }
    // });    
});