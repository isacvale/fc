# fc

# What

**fc** is a helper function for classless web components. It allows you to declare a web-component by calling `fc(componentObject)` instead of the class boilerplate, and allows you to do away with the `this` keyword.

# Why

To make web-components more palatable to me, or hopefully to anyone else who prefers functional programming over class-based object orientation.

Javascript was designed with a beautiful object and prototypical inheritance system. It was subsequently, modified to support another complete different paradigm, based on classes and object orientation, in an attempt to make it more palatable to Java and C# ("real") programmers.

I find it tolerable that javascript is "frankensteined" to make it more accessible to all backgrounds. But I found it deeply regrettable that web-components were locked in the other side of the fence, that is to say, that it requires the use of classes. The effect of this, to me, is that web components became ugly and cumbersome in their vanilla version, compared to the cheap and elegant functional components of React, for example.

This tool is one of a set I've built in the hopes of making websites without frameworks. The other tools are:

- [@dvo/chips](https://www.npmjs.com/package/@dvo/chips): allows for automatically lazy loading web components written as HTML files;
- [@dvo/stamp](https://www.npmjs.com/package/@dvo/stamp): allows dynamically populating containers with template components;
- [@dvo/raven](https://www.npmjs.com/package/@dvo/raven): a lightweight state management tool.

# How

**fc** is a function that receives a single object (we'll call it `componentObject`) defining the component's configurations, properties, and methods. Let's create a `hello-world` sample component:

```html
<!-- index.html -->
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
// javascript
import fc from "/node_modules/@dvo/fc/src/index.js";
  fc({
    tag: "hello-world",
    props: {
      connectedCallback: (el) => () => console.log("connectedCallback", el),
      logMeFunction: (el) => (...args) => console.log(el),
    }
  });
</script>
```

Notice you must create the markup of your component in the HTML, wrapped in a `<template>` tag. **fc** will look for the template whose id matches `tpl-<tag>`.

Finally, notice that there is a few special keys in the `componentObject`:

- `tag` refers to the custom element tag that will invoke the component. It is the only required property. **fc** will look in the HTML for a template with id equals to `tpl-<tag>` and use that to create the web-component.
- `observedAttributes` expects a list of strings identifying attributes that, when changed, should trigger `attributeChangedCallback`.
- `shadowRoot` determines if the component will make use of shadowRoot to encapsulate styling.
- `props` expect and object, whose properties are going to be moved to the component (see writing properties, below). Any methods you wish to add to the component shoud be added here as a prop.
- Inside `props`, there are five special keys mapping to the lifecycle of web components: `constructor`, `connectedCallback`, `disconnectedCallback`, `adoptedCallback`, and `attributeChangedCallback`. As all methods, they must be written as partial application, as described below.

## Writing properties

**fc** tries to avoid using the `this` keyword. When adding a property to the component, your can just add it to the `componentObject.props`. If that property relies on knowing something about the element, you must add it as a function that receives the component instance as the argument. For example:

```js
const hpPerLevel = 10;
fc({
  tag: "warrior",
  props: {
    // A static prop
    hpPerLevel,
    // A dynamic prop relying on dataset.level.
    // It will run when the component is instantiated, using the instance data-level.
    hp: (el) => el.dataset.level * hpPerLevel,
  },
});
```

To add a function as a property (aka. method), you must then use a partial application. That means, you must write a function that receives the component instanace (just like in the dynamic prop above), and that in turn returns the function you to be added to the component. Instead of relying on `this` keyword, it has access to the instance through the partial application.

```js
const hpPerLevel = 10;
fc({
  tag: "warrior",
  props: {
    // A component method
    warCry: (el) => () =>
      console.log(`I'm a ${el.dataset.level} level warrior!`),
  },
});
```

---

A final note: this is an experimental script that doesn't aim to reproduce everything available in web-components, but only the basic behaviour needed by the vast majority of components. In particular, it is expected to make components "cheap" to produce, much the same way that they are in React.
