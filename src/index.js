const safeRun =
  (func) =>
  (...args) =>
    typeof func === "function" && func(...args);

const fc = ({
  constructor: customConstructor = () => {},
  observedAttributes = [],
  props = {},
  tag,
}) => {
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

      Object.entries(props).forEach(([key, value]) =>
        addProp(key, value, that)
      );
      this.observedAttributes = observedAttributes;
      customConstructor(that);
    }

    connectedCallback(...args) {
      this && safeRun(this.connectedCallback)(...args);
    }

    disconnectedCallback(...args) {
      this && safeRun(this.disconnectedCallback)(...args);
    }

    adoptedCallback(...args) {
      this && safeRun(this.adoptedCallback)(...args);
    }

    attributeChangedCallback(...args) {
      this && safeRun(this.attributeChangedCallback)(...args);
    }
  }

  try {
    customElements.define(tag, NewComponent);
  } catch (err) {}

  return NewComponent;
};

export default fc;
