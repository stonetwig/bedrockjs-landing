import { Component, html } from "@rendly/bedrockjs";

class ExamplesPage extends Component {
  static tag = "examples-page";

  render() {
    return html`
      <section class="examples-hero">
        <span class="eyebrow">Sync engine</span>
        <h2>Live, offline-first demos</h2>
        <p class="lede">
          These three demos all talk to the same <code>/sync</code> endpoint on
          this Deno server, backed by Deno KV. Open any demo in two tabs (or on
          two devices) and watch updates stream live over Server-Sent Events.
          Toggle DevTools&nbsp;&rarr;&nbsp;Network&nbsp;&rarr;&nbsp;Offline and
          your writes still land — they queue locally and drain when you come
          back online.
        </p>
        <p class="demo-meta">
          Heads up: shared demo data is wiped every 15 minutes to keep things
          tidy. Reload to see the clean slate.
        </p>
      </section>

      <section class="example-grid">
        <router-link to="/examples/todo" class="example-card">
          <span class="example-tag">Synced model</span>
          <h3>Todo list</h3>
          <p>
            Collaborative tasks with create, toggle, and delete. The classic
            sync demo — add an item in one tab, watch it appear in the other.
          </p>
          <span class="example-link">Open demo →</span>
        </router-link>

        <router-link to="/examples/counter" class="example-card">
          <span class="example-tag">Shared state</span>
          <h3>Connected counter</h3>
          <p>
            One number, every connected client. Increment, decrement, or reset
            and see the change replicate instantly across all sessions.
          </p>
          <span class="example-link">Open demo →</span>
        </router-link>

        <router-link to="/examples/chat" class="example-card">
          <span class="example-tag">Real-time stream</span>
          <h3>Live chat</h3>
          <p>
            A minimal chat room. Each tab gets a generated client ID, and
            messages appear on every other open tab as soon as they're sent.
          </p>
          <span class="example-link">Open demo →</span>
        </router-link>
      </section>

      <section class="page-card">
        <h2>How it works</h2>
        <p>
          Each demo defines a <code>syncedModel</code> on the client. Reads
          (<code>Model.all()</code>, <code>Model.get(id)</code>, <code>Model.where(...)</code>)
          are reactive and update components automatically. Writes commit to
          IndexedDB first, batch-upload to <code>POST /sync/:model/ops</code>,
          and remote changes arrive over <code>GET /sync/:model/stream</code>.
        </p>
        <pre><code>import { syncedModel, configureSync } from "@rendly/bedrockjs/sync";

configureSync({ baseUrl: "/sync" });

const Todo = syncedModel("todo", {
  fields: {
    id: "string",
    title: "string",
    completed: "boolean",
    createdAt: "datetime",
    updatedAt: "datetime",
  },
});</code></pre>
      </section>
    `;
  }
}

ExamplesPage.register();
