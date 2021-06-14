import fc from "./index.js";
fc({
  tag: "hello-world",
  constructor: () => console.log("loaded component"),
});
