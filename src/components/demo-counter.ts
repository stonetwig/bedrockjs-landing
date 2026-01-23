import { Component, html } from "jsr:@devera/bedrockjs@0.1.1";

class DemoCounter extends Component {
  static tag = "demo-counter";

  static properties = {
    count: { type: Number, default: 0 },
  };

  increment = () => {
    this.count += 1;
  };

  render() {
    return html`
      <button class="counter" on-click=${this.increment}>
        Tap to mine: ${this.count}
      </button>
    `;
  }
}

DemoCounter.register();
