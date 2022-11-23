export const prevent_defaults = _prevent_defaults;
export const register_listener = _register_listener;
export const deregister_listener = _deregister_listener;

let mouseDownTimer = null;
const CONFIG = window.CONFIG || {};

const
    listeners = {},
    _cb_with_check = (name, callback, e) => {
        prevent_defaults(e);
        if (mouseDownTimer !== null) return;

        mouseDownTimer = setTimeout(() => {
            if (!listeners[name] || listeners[name].called) return;
            listeners[name].called = true;
            if (CONFIG._DEBUG_) console.info("*******CALLED ", name);
            callback(e);
        }, 600);
    },
    _mouse_up = (e) => {
        (mouseDownTimer !== null) && clearTimeout(mouseDownTimer);
        prevent_defaults(e);
        mouseDownTimer = null;
    },
    _default_prevent = (e) => {
        prevent_defaults(e);
        return false;
    };

document.addEventListener('mouseup', _mouse_up);
document.addEventListener('keyup', _mouse_up);
document.addEventListener('contextmenu', _default_prevent);


function _prevent_defaults(e) {
    (e || {}).preventDefault && e.preventDefault();
    (e || {}).stopPropagation && e.stopPropagation();
}

function _register_listener(name, cb, delay) {
    if (CONFIG._DEBUG_) console.info("REGISTERING INTERACTION FOR", name);
    listeners[name] = _cb_with_check.bind(null, name, cb);

    const _do_register = () => {
        document.addEventListener('mousedown', listeners[name]);
        document.addEventListener('keydown', listeners[name]);
    };
    if (!delay) _do_register();
    else setTimeout(_do_register, delay);
}


function _deregister_listener(name) {
    if (CONFIG._DEBUG_) console.info("DE-REGISTERING INTERACTION FOR", name);
    if (!listeners[name]) return;
    document.removeEventListener('mousedown', listeners[name]);
    document.removeEventListener('keydown', listeners[name]);
}