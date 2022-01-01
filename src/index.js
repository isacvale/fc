const safeRun =
  (func) =>
  (...args) =>
    typeof func === "function" && func(...args);

const fc = (component) => {
  const { observedAttributes, tag } = component;

  const addProp = (key, value, that) => {
    const boundValue = typeof value === "function" ? value(that) : value;
    that[key] = boundValue;
  };

  class NewComponent extends HTMLElement {
    static get observedAttributes() {
      return observedAttributes;
    }

    constructor() {
      super();
      const el = document.querySelector(`#tpl-${tag}`).content.cloneNode(true);
      this.attachShadow({ mode: "open" }).appendChild(el);
      const that = this;
      const {
        observedAttributes,
        constructor: customConstructor,
        ...properties
      } = component;
      Object.entries(properties).forEach(([key, value]) =>
        addProp(key, value, that)
      );
      this.observedAttributes = observedAttributes;
      customConstructor && customConstructor(that);
    }

    connectedCallback(...args) {
      safeRun(this.connectedCallback)(...args);
    }

    disconnectedCallback(...args) {
      safeRun(this.disconnectedCallback)(...args);
    }

    adoptedCallback(...args) {
      safeRun(this.adoptedCallback)(...args);
    }

    attributeChangedCallback(...args) {
      safeRun(this.attributeChangedCallback)(...args);
    }
  }

  try {
    customElements.define(tag, NewComponent);
  } catch (err) {}

  return NewComponent;
};

export default fc;
