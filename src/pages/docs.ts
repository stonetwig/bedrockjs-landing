import { Component, html } from "jsr:@devera/bedrockjs@0.1.1";

class DocsPage extends Component {
  static tag = "docs-page";

  render() {
    const componentSnippet = [
      'import { Component, html } from "jsr:@devera/bedrockjs@0.1.1";',
      "",
      "class WelcomePanel extends Component {",
      '  static tag = "welcome-panel";',
      "",
      "  static properties = {",
      '    name: { type: String, default: "Explorer" }',
      "  };",
      "",
      "  render() {",
      "    return html`<h3>Welcome, ${this.name}!</h3>`;",
      "  }",
      "}",
      "",
      "WelcomePanel.register();",
    ].join("\n");

    return html`
      <section class="page-card">
        <h2>Install BedrockJS</h2>
        <p>Use JSR to add the framework to your Deno project.</p>
        <pre><code>deno add jsr:@devera/bedrockjs</code></pre>
      </section>

      <section class="page-card">
        <h2>Create your first component</h2>
        <p>Components are Web Components with a clean render function.</p>
        <pre><code>${componentSnippet}</code></pre>
      </section>

      <section class="page-card">
        <h2>Wire in reactive state</h2>
        <p>Reactive helpers keep UI aligned with state changes.</p>
        <pre><code>import { reactive, watch } from "jsr:@devera/bedrockjs@0.1.1";

const state = reactive({ ore: 12 });
const stop = watch(() => {
  console.log("Ore count:", state.ore);
});

state.ore += 1;</code></pre>
      </section>
    `;
  }
}

DocsPage.register();
