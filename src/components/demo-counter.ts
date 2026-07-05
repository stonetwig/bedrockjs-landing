import { Component, html } from "@rendly/bedrockjs";

class DemoCounter extends Component {
  static override tag = "demo-counter";

  static override properties = {
    count: { type: Number, default: 0 },
  };

  declare count: number;

  increment = () => {
    this.count += 1;
  };

  override render() {
    return html`
      <button class="counter" on-click=${this.increment}>
        Tap to mine: ${this.count}
      </button>
    `;
  }
}

DemoCounter.register();
