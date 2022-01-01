# fc

# What and Why

**fc** is a helper function for classless web components. Why? To make web-components more palatable to those who favor a code leaning more towards functional programming and less towards class based object orientation.

Javascript has been designed with a beautiful object and prototypical inheritance system, and has subsequently added another complete paradigm on top of it, based on classes, in an attempt to make it more palatable to Java and C# programmers.

While these strives to give some universality to the language are, in my view, tolerable, I find unexcusable that webcomponents are implemented exclusively as classes. As a developers really interested in "vanilla" technologies, it pains me to see how superior functional components in React are, as compared to the cumbersome web components.

This small library is an attempt to create a piece of the technology that would improve the development experience without frameworks. The other pieces of these technologies are:

- @dvo/chips: allows for automatically lazy loading web components;
- @dvo/stamp: allows dynamically populating containers with template components;
- @dvo/raven: a lightweight state management tool.

# How

**fc** is a function that receives a single object (we'l call it `component object`) where keys are mapped to a component's properties. That means if you want your element to have a `name` or `price` property, you simply add that key/value pair to your `component object`.
Having said, there are a few keys to have in mind:

- `tag` refers to the tag that will invoke the component, and is the only required property. **fc** will look for a template with id equals to `tpl-<tag>` and use that to create the web-component.
- `constructor`, `connectedCallback`, `disconnectedCallback`, `adoptedCallback`, and `attributeChangedCallback` are lifecycle hooks of the web components and work as expected.
- `observedAttributes` expects a list of strings identifying attributes that, when changed, should trigger `attributeChangedCallback`.

## Writing properties

**fc** tries to avoid using the `this` keyword, so any functions added as properties to the `component object` are run immediately with the element itself as an argument. That means two things:
1 - You can set a variable dependent on the instance of the component. For example, you can set an attribute on the element and derive a property by adding a function, which will run in the component's creation.

```js
fc({
  tag: "rpg-character",
  hp: el => +el.dataset.level * 10, // Will be run immediately
})

<rpg-character data-level="5"></rpg-character>
```

2 - Because functions are called immediately, to create an actual method, you must mak use of a partial application that first receives the element, then the normal arguments. The first part of the function (which receives the object) is run instantly, but the rest of the execution will be run at the appropriate time, and will still have closure over the element variable. For example:

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
