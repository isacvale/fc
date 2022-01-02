import fc from "./index.js";
fc({
  tag: "hello-world",
  props: {
    constructor: () => console.log("loaded component"),
    hp: (el) => {
      console.log(">>>", el, el.dataset);
      return +el.dataset.level * 100;
    },
  },
});
