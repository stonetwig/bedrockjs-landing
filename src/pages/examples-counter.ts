import { Component, html } from "@rendly/bedrockjs";
import { syncedModel } from "@rendly/bedrockjs/sync";

const Counter = syncedModel("counter", {
  fields: {
    id: "string",
    value: "number",
    label: "string",
  },
});

function isMissingStoreError(error: unknown) {
  return error instanceof DOMException && error.name === "NotFoundError";
}

function getMainCounter() {
  try {
    return Counter.get("main") as
      | { value: number; label: string }
      | undefined;
  } catch (error) {
    if (isMissingStoreError(error)) return undefined;
    throw error;
  }
}

async function ensureCounter() {
  const existing = getMainCounter();
  if (!existing) {
    try {
      await Counter.create({
        id: "main",
        value: 0,
        label: "Connected counter",
      });
    } catch (error) {
      if (!isMissingStoreError(error)) throw error;
    }
  }
}

class ExamplesCounter extends Component {
  static tag = "examples-counter";

  connectedCallback() {
    super.connectedCallback();
    ensureCounter();
  }

  bump = (delta: number) => {
    const current = getMainCounter();
    if (!current) {
      void ensureCounter().then(() => this.bump(delta));
      return;
    }

    Counter.update("main", { value: current.value + delta });
  };

  reset = () => {
    const current = getMainCounter();
    if (!current) {
      void ensureCounter().then(() => this.reset());
      return;
    }

    Counter.update("main", { value: 0 });
  };

  render() {
    const counter = getMainCounter();
    const value = counter?.value ?? 0;
    const label = counter?.label ?? "Loading…";

    return html`
      <section class="demo-hero">
        <router-link to="/examples" class="back-link">← All examples</router-link>
        <span class="eyebrow">Shared state</span>
        <h2>Connected counter</h2>
        <p>
          One <code>counter</code> document, every browser. Click the buttons
          and the value updates everywhere over SSE. Refresh, swap devices —
          the number sticks.
        </p>
      </section>

      <section class="demo-card counter-card">
        <div class="counter-display">
          <div class="counter-value">${value}</div>
          <div class="counter-label">${label}</div>
        </div>

        <div class="counter-controls">
          <button class="btn ghost" on-click=${() => this.bump(-1)}>−</button>
          <button class="btn ghost" on-click=${this.reset}>Reset</button>
          <button class="btn primary" on-click=${() => this.bump(1)}>+</button>
        </div>

        <p class="demo-meta">
          Open this page in another tab to see the counter stay in sync.
        </p>
      </section>
    `;
  }
}

ExamplesCounter.register();
