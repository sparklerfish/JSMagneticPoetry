/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import { createSecureContext } from \"tls\";\n\nconsole.log(\"Webpack is working!\");\n\n// const words = [];\n// let newWord = \"test\";\n// let newDiv = document.createElement(\"div\");\n\n// const words = document.getElementsByClassName(\"word\");\n\n\nwindow.onload = function() {\n    // async function apiGetAll() {\n    //   try {\n    //     const resp = await fetch(\n    //       \"https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?rel_trg=cow\"\n    //     );\n    //     console.log(resp.json());\n    //     return resp.json();\n    //   } catch (err) {\n    //     console.log(err);\n    //   }\n    // }\n\n    // apiGetAll();\n\n    // let words;\n    // fetch(\n    //   \"https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?rel_trg=cow\"\n    // )\n    //   .then(response => {\n    //     words = response.json();\n    //     return words;\n    //   })\n    // //   console.log(words)\n    \n    // let wordId;\n    document.addEventListener(\"mouseover\", e => dragWord(e.target.id));\n    // console.log(wordId)\n\n    const dragWord = wordId => {\n        if (!wordId) return;\n        const word = document.getElementById(wordId);\n    \n        word.onmousedown = function(event) {\n            word.style.position = 'absolute';\n            word.style.zIndex = 1000;\n            // document.body.append(word);\n        \n            moveAt(event.pageX, event.pageY);\n            console.log(event.currentTarget.id)\n            \n            function moveAt(pageX, pageY) {\n                word.style.left = pageX - word.offsetWidth / 2 + 'px';\n                word.style.top = pageY - word.offsetHeight / 2 + 'px';\n            }\n        \n            function onMouseMove(event) {\n                moveAt(event.pageX, event.pageY)\n            }\n        \n            document.addEventListener('mousemove', onMouseMove);\n        \n            word.onmouseup = function() {\n                document.removeEventListener('mousemove', onMouseMove);\n                word.onmouseup = null;\n            }\n        }\n        word.ondragstart = function() {\n          return false;\n        }\n    \n    };\n\n\n\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });