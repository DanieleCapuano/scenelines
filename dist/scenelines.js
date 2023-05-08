/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scenelines"] = factory();
	else
		root["scenelines"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/change-listener.js":
/*!********************************!*\
  !*** ./src/change-listener.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deregister_listener\": () => (/* binding */ deregister_listener),\n/* harmony export */   \"prevent_defaults\": () => (/* binding */ prevent_defaults),\n/* harmony export */   \"register_listener\": () => (/* binding */ register_listener)\n/* harmony export */ });\nconst prevent_defaults = _prevent_defaults;\nconst register_listener = _register_listener;\nconst deregister_listener = _deregister_listener;\nlet CONFIG = window.CONFIG,\n  mouseDownTimer = null,\n  longPressTime = (CONFIG || {}).long_press_time || 3000,\n  timeoutInterval = (CONFIG || {}).click_press_interval || 1000;\nconst listeners = {},\n  _mouse_up = e => {\n    mouseDownTimer !== null && clearInterval(mouseDownTimer);\n    prevent_defaults(e);\n    mouseDownTimer = null;\n  },\n  _cb_with_check = (name, callback, nowPlusDelay, e) => {\n    prevent_defaults(e);\n    if (mouseDownTimer !== null) return;\n    longPressTime = (CONFIG || {}).long_press_time || 3000;\n    timeoutInterval = (CONFIG || {}).click_press_interval || 1000;\n    let mouseDownNow = performance.now();\n    mouseDownTimer = setInterval(() => {\n      let forcing_call = false,\n        now = performance.now();\n      if (now - mouseDownNow >= longPressTime) forcing_call = true;\n      if (now < nowPlusDelay && !forcing_call) return;\n      if (!listeners[name] || listeners[name].called) {\n        _deregister_listener(name);\n        return _mouse_up();\n      }\n      listeners[name].called = true;\n      if ((CONFIG || {})._DEBUG_) console.info(\"*******CALLED \", name);\n      clearInterval(mouseDownTimer);\n      callback(e);\n    }, timeoutInterval);\n  },\n  _default_prevent = e => {\n    prevent_defaults(e);\n    return false;\n  };\ndocument.addEventListener('mouseup', _mouse_up);\ndocument.addEventListener('keyup', _mouse_up);\ndocument.addEventListener('contextmenu', _default_prevent);\nfunction _prevent_defaults(e) {\n  (e || {}).preventDefault && e.preventDefault();\n  (e || {}).stopPropagation && e.stopPropagation();\n}\nfunction _register_listener(name, cb, delay, config) {\n  CONFIG = CONFIG || config;\n  if ((CONFIG || {})._DEBUG_) console.info(\"REGISTERING INTERACTION FOR\", name);\n  listeners[name] = _cb_with_check.bind(null, name, cb, performance.now() + (delay || 0));\n  document.addEventListener('mousedown', listeners[name]);\n  document.addEventListener('keydown', listeners[name]);\n}\nfunction _deregister_listener(name, config) {\n  CONFIG = CONFIG || config;\n  if ((CONFIG || {})._DEBUG_) console.info(\"DE-REGISTERING INTERACTION FOR\", name);\n  if (!listeners[name]) return;\n  document.removeEventListener('mousedown', listeners[name]);\n  document.removeEventListener('keydown', listeners[name]);\n}\n\n//# sourceURL=webpack://scenelines/./src/change-listener.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get_config\": () => (/* binding */ get_config)\n/* harmony export */ });\nconst get_config = _get_config;\nfunction _get_config(config_path) {\n  return new Promise(res => {\n    fetch(config_path).then(o => o.json()).then(conf => res(conf));\n  });\n}\n\n//# sourceURL=webpack://scenelines/./src/config.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"deregister_listener\": () => (/* reexport safe */ _change_listener__WEBPACK_IMPORTED_MODULE_1__.deregister_listener),\n/* harmony export */   \"prevent_defaults\": () => (/* reexport safe */ _change_listener__WEBPACK_IMPORTED_MODULE_1__.prevent_defaults),\n/* harmony export */   \"register_listener\": () => (/* reexport safe */ _change_listener__WEBPACK_IMPORTED_MODULE_1__.register_listener),\n/* harmony export */   \"setup_scenes\": () => (/* binding */ setup_scenes)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n/* harmony import */ var _change_listener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./change-listener */ \"./src/change-listener.js\");\n\n\nconst setup_scenes = _setup_scenes;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  setup_scenes,\n  prevent_defaults: _change_listener__WEBPACK_IMPORTED_MODULE_1__.prevent_defaults,\n  register_listener: _change_listener__WEBPACK_IMPORTED_MODULE_1__.register_listener,\n  deregister_listener: _change_listener__WEBPACK_IMPORTED_MODULE_1__.deregister_listener\n});\n\n////////////////////////////////////////////////////////////////////////////////////////\n\nfunction _setup_scenes(setup_conf) {\n  const {\n    search\n  } = window.location;\n  let params = {};\n  if (search !== \"\") {\n    //read parameters from URL location\n    params = search.split(\"&\").reduce((p_obj, str) => {\n      const a = str.split(\"=\");\n      p_obj[a[0].replace(\"?\", \"\")] = a[1];\n      return p_obj;\n    }, {});\n  }\n  const {\n    config_path,\n    scenes_files\n  } = setup_conf;\n  return new Promise((res, rej) => {\n    (0,_config__WEBPACK_IMPORTED_MODULE_0__.get_config)(config_path).then(_cfg => {\n      const config = Object.assign({}, _cfg.default || _cfg, params);\n      if (!config.scenes) {\n        console.error(\"No scenes description found. Exiting.\");\n        return;\n      }\n      if (!config.light_addresses && !config.light_options) {\n        console.warn(\"You should provide light_addresses || light_options. No lighting information available.\");\n        config.light_addresses = [];\n        config.light_options = {};\n      }\n      if (!config.light_addresses) {\n        config.light_addresses = Object.keys(config.light_options).map(s => parseInt(s));\n      }\n      const scenes_obj = config.scenes;\n      const scenes_order = Object.keys(scenes_obj).map(k => scenes_obj[k]);\n      let scenes_array = [];\n      config.DEBUG = config._FEDEBUG_;\n      window.CONFIG = config;\n      if (config.DEBUG) {\n        console.info(\"SCENES\", scenes_files);\n      }\n      scenes_array = Object.keys(scenes_files).filter(sc_name => scenes_order.indexOf(sc_name) !== -1) //YOU CAN EXEC ONLY THE SCENES IN scenes_order\n      .sort((sc_a, sc_b) => {\n        //...IN THE ORDER SPECIFIED IN scenes_order\n        return scenes_order.indexOf(sc_a) < scenes_order.indexOf(sc_b) ? -1 : 1;\n      }).map((sc, i, all_scenes_keys) => {\n        let scene = scenes_files[sc];\n        scene.API.init(config);\n        scene.API.start = scene.API.start.bind(null, get_sibling(scenes_files, all_scenes_keys, i, \"prev\", config), get_sibling(scenes_files, all_scenes_keys, i, \"succ\", config));\n        scene.API.stop = scene.API.stop.bind(null, get_sibling(scenes_files, all_scenes_keys, i, \"prev\", config), get_sibling(scenes_files, all_scenes_keys, i, \"succ\", config));\n        return scene;\n      });\n      res({\n        config,\n        scenes_array\n      });\n    });\n  });\n}\nconst _blank_scene = {\n  API: {\n    start: () => {},\n    stop: () => {}\n  }\n};\nfunction get_sibling(scenes_files, keys_a, i, direction, config) {\n  const {\n    scenes_loop\n  } = config;\n  const sc_index = direction === 'prev' ? i === 0 ? scenes_loop ? keys_a.length - 1 : -1 : i - 1 : i === keys_a.length - 1 ? scenes_loop ? 0 : -1 : i + 1;\n  return (scenes_files[keys_a[sc_index]] || _blank_scene).API;\n}\n\n//# sourceURL=webpack://scenelines/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});