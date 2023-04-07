export const prevent_defaults = _prevent_defaults;
export const register_listener = _register_listener;
export const deregister_listener = _deregister_listener;

let CONFIG = window.CONFIG,
    mouseDownTimer = null,
    longPressTime = (CONFIG || {}).long_press_time || 3000;

const
    timeoutInterval = 500,
    listeners = {},
    _mouse_up = (e) => {
        (mouseDownTimer !== null) && clearInterval(mouseDownTimer);
        prevent_defaults(e);

        mouseDownTimer = null;
    },
    _cb_with_check = (name, callback, nowPlusDelay, e) => {
        prevent_defaults(e);
        if (mouseDownTimer !== null) return;

        longPressTime = (CONFIG || {}).long_press_time || 3000;

        let mouseDownNow = performance.now();
        mouseDownTimer = setInterval(() => {
            let forcing_call = false,
                now = performance.now();

            if (now - mouseDownNow >= longPressTime) forcing_call = true;

            if (now < nowPlusDelay && !forcing_call) return;
            if (!listeners[name] || listeners[name].called) {
                _deregister_listener(name);
                return _mouse_up();
            }

            listeners[name].called = true;
            if ((CONFIG || {})._DEBUG_) console.info("*******CALLED ", name);

            clearInterval(mouseDownTimer);
            callback(e);
        }, timeoutInterval);
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

function _register_listener(name, cb, delay, config) {
    CONFIG = CONFIG || config;
    if ((CONFIG || {})._DEBUG_) console.info("REGISTERING INTERACTION FOR", name);
    listeners[name] = _cb_with_check.bind(null, name, cb, performance.now() + delay);

    document.addEventListener('mousedown', listeners[name]);
    document.addEventListener('keydown', listeners[name]);
}


function _deregister_listener(name, config) {
    CONFIG = CONFIG || config;
    if ((CONFIG || {})._DEBUG_) console.info("DE-REGISTERING INTERACTION FOR", name);
    if (!listeners[name]) return;
    document.removeEventListener('mousedown', listeners[name]);
    document.removeEventListener('keydown', listeners[name]);
}