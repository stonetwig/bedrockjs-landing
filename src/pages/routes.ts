import { Component, html } from "@rendly/bedrockjs";

class RoutesPage extends Component {
  static tag = "routes-page";

  render() {
    return html`
      <section class="page-card">
        <h2>Router setup</h2>
        <p>BedrockJS ships a tiny client-side router for clean navigation.</p>
        <pre><code>import { createRouter } from "@rendly/bedrockjs";

createRouter({
  routes: [
    { path: "/", component: "home-page" },
    { path: "/docs", component: "docs-page" },
    { path: "/routes", component: "routes-page" },
    { path: "/examples", component: "examples-page" }
  ]
});</code></pre>
      </section>

      <section class="route-grid">
        <div class="route-card">
          <h3>/</h3>
          <p>Landing page with hero, sync overview, and feature grid.</p>
        </div>
        <div class="route-card">
          <h3>/docs</h3>
          <p>Install, components, reactive state, and sync engine snippets.</p>
        </div>
        <div class="route-card">
          <h3>/routes</h3>
          <p>Router configuration and navigation notes.</p>
        </div>
        <div class="route-card">
          <h3>/examples</h3>
          <p>Live sync demos backed by the same-origin Deno KV server.</p>
        </div>
      </section>

      <section class="page-card">
        <h2>Navigation in templates</h2>
        <p>Drop router links anywhere in your layout.</p>
        <pre><code>&lt;router-link to="/docs"&gt;Docs&lt;/router-link&gt;
&lt;router-outlet&gt;&lt;/router-outlet&gt;</code></pre>
      </section>
    `;
  }
}

RoutesPage.register();
