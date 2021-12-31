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

**fc** is a function that receives a single object where keys are mapped to a component's properties. That means to have your element have `name`, `price` property, you must simple have that key/value pair in the argument object.
Having said, there are a few keys to have in mind:
- `tag` refers to the tag that will invoke the component, and is the only required property. **fc** will look for a template with id equals to `tpl-<tag>` and use that to create the web-component.
- `constructor`, `connectedCallback`, `disconnectedCallback`, `adoptedCallback`, and `attributeChangedCallback` are lifecycle hooks of the web components and work as expected.
- `observedAttributes` expects a list of strings identifying attributes that, when changed, should trigger `attributeChangedCallback`.

This is an experimental script that doesn't aim to reproduce everything available in web-components, but only the basic behaviour needed by the vast majority of components. In particular, it is expected to make components "cheap" to produce, much the same way that they are in React.
