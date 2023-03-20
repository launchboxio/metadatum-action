/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 944:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 26:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const axios = __nccwpck_require__(26);
const core = __nccwpck_require__(944);

async function run() {
  try {
    // Fetch an OIDC token for authenticating to Metadatum
    const audience = core.getInput('audience', {required: false});
    const token = core.getIDToken(audience)

    const instance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      },
      baseURL: core.getInput('endpoint')
    })

    // Based on requested action, build a request
    switch (core.getInput('action')) {
      case 'set':
        await instance.post("/api/v1/metadata", core.getInput('data'))
        break
      case 'get':
        await instance.get("/api/v1/metadata", {
          params: generateParameters(core.getInput('query'))
        })
        break
      case 'delete':
        throw new Error("Delete method not currently supported")
      case 'update':
        throw new Error("Update method not currently supported")
      default:
        throw new Error(`Invalid method ${core.getInput('action')} provided`)
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

const generateParameters = (input) => {
  let params = JSON.parse(input)
  return new URLSearchParams(params);
}

if (require.main === require.cache[eval('__filename')]) {
  run();
}
})();

module.exports = __webpack_exports__;
/******/ })()
;