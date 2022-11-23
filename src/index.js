import { get_config } from "./config";
import { prevent_defaults, register_listener, deregister_listener } from "./change-listener";

const setup_scenes = _setup_scenes;

export {
    setup_scenes,
    prevent_defaults,
    register_listener,
    deregister_listener
};

export default {
    setup_scenes,
    prevent_defaults,
    register_listener,
    deregister_listener
};

////////////////////////////////////////////////////////////////////////////////////////

function _setup_scenes(setup_conf) {
    const { config_path, scenes_files } = setup_conf;

    return new Promise((res, rej) => {
        get_config(config_path).then((_cfg) => {
            const config = Object.assign({}, _cfg.default || _cfg);

            const scenes_obj = config.scenes;
            const scenes_order = Object.keys(scenes_obj).map(k => scenes_obj[k]);
            let scenes_array = [];

            config.DEBUG = config._FEDEBUG_;
            window.CONFIG = config;

            if (config.DEBUG) {
                console.info("SCENES", scenes_files);
            }

            scenes_array = Object.keys(scenes_files)
                .filter(sc_name => scenes_order.indexOf(sc_name) !== -1)         //YOU CAN EXEC ONLY THE SCENES IN scenes_order
                .sort((sc_a, sc_b) => {                                          //...IN THE ORDER SPECIFIED IN scenes_order
                    return scenes_order.indexOf(sc_a) < scenes_order.indexOf(sc_b) ? -1 : 1;
                })
                .map((sc, i, all_scenes_keys) => {
                    let scene = scenes_files[sc];
                    scene.API.init(config);

                    scene.API.start = scene.API.start.bind(
                        null,
                        get_sibling(scenes_files, all_scenes_keys, i, "prev", config),
                        get_sibling(scenes_files, all_scenes_keys, i, "succ", config)
                    );
                    scene.API.stop = scene.API.stop.bind(
                        null,
                        get_sibling(scenes_files, all_scenes_keys, i, "prev", config),
                        get_sibling(scenes_files, all_scenes_keys, i, "succ", config)
                    );

                    return scene;
                });

            res({
                config,
                scenes_array
            });
        })
    });
}

const _blank_scene = {
    API: {
        start: () => { },
        stop: () => { }
    }
};
function get_sibling(scenes_files, keys_a, i, direction, config) {
    const { scenes_loop } = config;
    const sc_index = direction === 'prev' ? (
        i === 0 ? (scenes_loop ? keys_a.length - 1 : -1) : i - 1
    ) : (
        i === keys_a.length - 1 ? (scenes_loop ? 0 : -1) : i + 1
    );

    return (scenes_files[keys_a[sc_index]] || _blank_scene).API;
}