import { Component, html } from "jsr:@devera/bedrockjs@0.1.1";

class RoutesPage extends Component {
  static tag = "routes-page";

  render() {
    return html`
      <section class="page-card">
        <h2>Router setup</h2>
        <p>BedrockJS ships a tiny client-side router for clean navigation.</p>
        <pre><code>import { createRouter } from "jsr:@devera/bedrockjs@0.1.1";

createRouter({
  routes: [
    { path: "/", component: "home-page" },
    { path: "/docs", component: "docs-page" },
    { path: "/routes", component: "routes-page" }
  ]
});</code></pre>
      </section>

      <section class="route-grid">
        <div class="route-card">
          <h3>/</h3>
          <p>Landing page with hero and feature grid.</p>
        </div>
        <div class="route-card">
          <h3>/docs</h3>
          <p>Install, component, and reactive snippets.</p>
        </div>
        <div class="route-card">
          <h3>/routes</h3>
          <p>Router configuration and navigation notes.</p>
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
