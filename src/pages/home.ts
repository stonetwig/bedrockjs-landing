import { Component, html } from "@rendly/bedrockjs";

class HomePage extends Component {
  static tag = "home-page";

  render() {
    return html`
      <section class="hero">
        <div class="hero-content">
          <span class="eyebrow">@rendly/bedrockjs</span>
          <h1>Build faster. Sync everywhere. No fuss.</h1>
          <p class="lede">
            A compact Deno-first framework for routing, components, reactive
            state, and an offline-first sync engine. IndexedDB on the client,
            Deno KV on the server, real-time updates over SSE.
          </p>
          <div class="cta-row">
            <a class="btn primary" href="https://jsr.io/@rendly/bedrockjs">
              Get started
            </a>
            <a class="btn ghost" href="/examples">
              See sync demos
            </a>
          </div>
          <div class="stat-grid">
            <div class="stat-card">
              <p class="stat-number">0.1.2</p>
              <p class="stat-label">Latest release</p>
            </div>
            <div class="stat-card">
              <p class="stat-number">Deno-first</p>
              <p class="stat-label">Server &amp; client</p>
            </div>
            <div class="stat-card">
              <p class="stat-number">Sync</p>
              <p class="stat-label">Offline-first, real-time</p>
            </div>
          </div>
        </div>
        <cube-3d></cube-3d>
      </section>

      <section class="feature-grid">
        <article>
          <h3>Solid routing</h3>
          <p>Organize pages with a lightweight router that works everywhere.</p>
        </article>
        <article>
          <h3>Composable UI</h3>
          <p>Web components built on a lightweight, typed component base.</p>
        </article>
        <article>
          <h3>Reactive state</h3>
          <p>Signals and reactive helpers for UI that updates cleanly.</p>
        </article>
        <article>
          <h3>Offline-first sync</h3>
          <p>Optimistic local writes, IndexedDB persistence, SSE updates.</p>
        </article>
        <article>
          <h3>Deno KV server</h3>
          <p>Drop-in <code>createSyncServer</code> with the Deno KV adapter.</p>
        </article>
        <article>
          <h3>Zero build</h3>
          <p>Pure ESM, TypeScript-ready, runs on Deno Deploy out of the box.</p>
        </article>
      </section>

      <section class="hero-card">
        <p class="card-title">Quick start</p>
        <pre><code>deno add jsr:@rendly/bedrockjs

import { createRouter } from "@rendly/bedrockjs";

createRouter({
  routes: [{ path: "/", component: "home-page" }]
});</code></pre>
      </section>

      <section class="hero-card">
        <p class="card-title">Sync in two snippets</p>
        <pre><code>// client
import { syncedModel, configureSync } from "@rendly/bedrockjs/sync";

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
        <pre><code>// server (Deno)
import {
  createSyncServer,
  denoKvAdapter,
} from "@rendly/bedrockjs/sync/server";

const sync = await createSyncServer({
  storage: denoKvAdapter({}),
  models: ["todo"],
  basePath: "/sync",
  cors: true,
});

Deno.serve((req) => sync(req));</code></pre>
      </section>

      <section class="playground">
        <div>
          <h2>Try it live</h2>
          <p>
            This button is a BedrockJS component with reactive state.
            Click it and watch the count update in real time.
          </p>
        </div>
        <demo-counter></demo-counter>
      </section>
    `;
  }
}

HomePage.register();
