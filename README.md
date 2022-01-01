# fc

# What

**fc** is a helper function for classless web components. It allows you to declare a web-component by calling `fc(componentObject)` instead of the class boilerplate, and allows you to do away with the `this` keyword.

# Why

To make web-components more palatable to me, or hopefully to anyone else who prefers functional programming over class-based object orientation.

Javascript was designed with a beautiful object and prototypical inheritance system. It was subsequently, modified to support another complete different paradigm, based on classes and object orientation, in an attempt to make it more palatable to Java and C# ("real") programmers.

I find it tolerable that javascript is "frankensteined" to make it more accessible to all backgrounds. But I found it deep regrettable that web-components were locked in the other side of the fence, that is to say, that it requires the use of classes. The effect of this, to me, is that web components became ugly and cumbersome in their vanilla version, compared to the cheap and elegant functional components of React, for example.

This tool is one of a set I've built in the hopes of makes websites without frameworks. The other tools:

- [@dvo/chips](https://www.npmjs.com/package/@dvo/chips): allows for automatically lazy loading web components;
- [@dvo/stamp](https://www.npmjs.com/package/@dvo/stamp): allows dynamically populating containers with template components;
- [@dvo/raven](https://www.npmjs.com/package/@dvo/raven): a lightweight state management tool.

# How

**fc** is a function that receives a single object (we'll call it `component object`) defining the component's properties and methods. That means if you want your element to have an `x` property, you simply add that entry to your `component object`. Let's create a `hello-world` sample component:

```html
<template id="tpl-hello-world">
  <p>hello-world</p>
  <style>
    p {
      color: purple;
      font-weight: bold;
    }
  </style>
</template>
```

```js
  import fc from "/node_modules/@dvo/fc/src/index.js";
  fc({
    tag: "hello-world",
    connectedCallback: (el) => () => console.log("connectedCallback", el),
    logMeFunction: (el) => (...args) => console.log(el),
  });
</script>
```

Notice you must create the markup of your component in the HTML, wrapped in a `<template>` tag. **fc** will look for the template whose id matches `tpl-<tag>`.

Finally, notice that there are a few special `component object` keys to be aware of:

- `tag` refers to the custom element tag that will invoke the component. It is the only required property. **fc** will look for a template with id equals to `tpl-<tag>` and use that to create the web-component.
- `constructor`, `connectedCallback`, `disconnectedCallback`, `adoptedCallback`, and `attributeChangedCallback` are lifecycle hooks of the web components and work as expected. Set them with partial applications, as described below.
- `observedAttributes` expects a list of strings identifying attributes that, when changed, should trigger `attributeChangedCallback`.

## Writing properties

**fc** tries to avoid using the `this` keyword, so any functions added as properties to the `component object` are run immediately with the element itself as an argument. That means two things:
1 - You can set a variable dependent on the instance of the component. For example, you can set an attribute on the element and derive a property by adding a function, which will run in the component's creation.

```js
<rpg-character data-level="5"></rpg-character>;

fc({
  tag: "rpg-character",
  hp: (el) => +el.dataset.level * 10, // Will be run immediately, setting hp to 5
});
```

2 - Because functions are called immediately, to create an actual method, you must use a partial application that first receives the element, then the normal arguments. The first part of the function (receiving the object) is run instantly, but the rest of the execution will be run at the appropriate time, and will still have closure over the element variable. For example:

```js
fc({
  tag: "rpg-character",
  speak:
    (el) =>
    (...args) =>
      console.log(`I'm level ${el.dataset.level}!`), // Will be run when element.speak() is called
});
```

---

A final note: this is an experimental script that doesn't aim to reproduce everything available in web-components, but only the basic behaviour needed by the vast majority of components. In particular, it is expected to make components "cheap" to produce, much the same way that they are in React.
