import { Component, html } from "@rendly/bedrockjs";

class DocsPage extends Component {
  static tag = "docs-page";

  render() {
    const componentSnippet = [
      'import { Component, html } from "@rendly/bedrockjs";',
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

    const syncClientSnippet = [
      'import { syncedModel, configureSync } from "@rendly/bedrockjs/sync";',
      "",
      'configureSync({ baseUrl: "/sync" });',
      "",
      'const Todo = syncedModel("todo", {',
      "  fields: {",
      '    id: "string",',
      '    title: "string",',
      '    completed: "boolean",',
      '    createdAt: "datetime",',
      '    updatedAt: "datetime",',
      "  },",
      "});",
      "",
      "await Todo.create({",
      "  id: crypto.randomUUID(),",
      '  title: "Ship release",',
      "  completed: false,",
      "  createdAt: new Date(),",
      "  updatedAt: new Date(),",
      "});",
    ].join("\n");

    const syncServerSnippet = [
      "import {",
      "  createSyncServer,",
      "  denoKvAdapter,",
      '} from "@rendly/bedrockjs/sync/server";',
      "",
      "const sync = await createSyncServer({",
      "  storage: denoKvAdapter({}),",
      '  models: ["todo", "counter", "message"],',
      '  basePath: "/sync",',
      "  cors: true,",
      "});",
      "",
      "Deno.serve((req) => sync(req));",
    ].join("\n");

    return html`
      <section class="page-card">
        <h2>Install BedrockJS</h2>
        <p>Add the framework to your Deno project via JSR.</p>
        <pre><code>deno add jsr:@rendly/bedrockjs</code></pre>
      </section>

      <section class="page-card">
        <h2>Create your first component</h2>
        <p>Components are Web Components with a clean render function.</p>
        <pre><code>${componentSnippet}</code></pre>
      </section>

      <section class="page-card">
        <h2>Wire in reactive state</h2>
        <p>Reactive helpers keep UI aligned with state changes.</p>
        <pre><code>import { reactive, watch } from "@rendly/bedrockjs";

const state = reactive({ count: 12 });
const stop = watch(() => {
  console.log("Count:", state.count);
});

state.count += 1;</code></pre>
      </section>

      <section class="page-card">
        <h2>Sync engine — client</h2>
        <p>
          Define a synced model and read it reactively. Writes go to IndexedDB
          first, queue while offline, and replicate to other clients via SSE.
        </p>
        <pre><code>${syncClientSnippet}</code></pre>
      </section>

      <section class="page-card">
        <h2>Sync engine — Deno server</h2>
        <p>
          <code>createSyncServer</code> exposes <code>POST /sync/:model/ops</code>
          and a streaming <code>GET /sync/:model/stream</code>. Storage is
          pluggable; this site uses the bundled Deno KV adapter.
        </p>
        <pre><code>${syncServerSnippet}</code></pre>
      </section>
    `;
  }
}

DocsPage.register();
