"use strict";

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _index["default"])({
  tag: "hello-world",
  props: {
    constructor: function constructor() {
      return console.log("loaded component");
    },
    hp: function hp(el) {
      console.log(">>>", el, el.dataset);
      return +el.dataset.level * 100;
    }
  }
});