import { Component, html } from "jsr:@devera/bedrockjs@0.1.1";

class HomePage extends Component {
  static tag = "home-page";

  render() {
    return html`
      <section class="hero">
        <div class="hero-content">
          <p class="eyebrow">@devera/bedrockjs</p>
          <h1>Lay down the bedrock. Build faster on top.</h1>
          <p class="lede">
            BedrockJS gives you a compact, Deno-ready foundation for routing,
            components, and reactive state. A framework that feels like crafting
            blocks: simple pieces, steady results.
          </p>
          <div class="cta-row">
            <a class="btn primary" href="https://jsr.io/@devera/bedrockjs@0.1.1">
              Open the docs
            </a>
            <a class="btn ghost" href="https://jsr.io/@devera/bedrockjs@0.1.1">
              Install from JSR
            </a>
          </div>
          <div class="stat-grid">
            <div class="stat-card">
              <p class="stat-number">0.1.1</p>
              <p class="stat-label">Current release</p>
            </div>
            <div class="stat-card">
              <p class="stat-number">Deno-first</p>
              <p class="stat-label">No build config needed</p>
            </div>
            <div class="stat-card">
              <p class="stat-number">Router</p>
              <p class="stat-label">Client-side navigation</p>
            </div>
          </div>
        </div>
        <div class="hero-card">
          <img class="hero-logo" src="/bedrockjs.png" alt="BedrockJS block" />
          <div>
            <p class="card-title">Quick start</p>
            <pre><code>deno add jsr:@devera/bedrockjs

import { createRouter } from "jsr:@devera/bedrockjs@0.1.1";

createRouter({
  routes: [{ path: "/", component: "home-page" }]
});</code></pre>
          </div>
        </div>
      </section>

      <section class="feature-grid">
        <article>
          <h3>Solid routing</h3>
          <p>Organize pages with a small router that plays well with Deno.</p>
        </article>
        <article>
          <h3>Composable UI</h3>
          <p>Web components built on a lightweight, typed component base.</p>
        </article>
        <article>
          <h3>Reactive state</h3>
          <p>Signals and reactive helpers for UI that updates cleanly.</p>
        </article>
      </section>

      <section class="playground">
        <div>
          <h2>Test the building blocks</h2>
          <p>
            This button is a BedrockJS component with reactive state. Click to
            mine counters.
          </p>
        </div>
        <demo-counter></demo-counter>
      </section>
    `;
  }
}

HomePage.register();
