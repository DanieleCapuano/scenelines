export const get_config = _get_config;

function _get_config(config_path) {
    return new Promise(res => {
        fetch(config_path)
        .then(o => o.json())
        .then(conf => res(conf));
    });
}