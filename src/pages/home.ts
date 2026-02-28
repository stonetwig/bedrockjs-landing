import { Component, html } from "jsr:@devera/bedrockjs@0.1.1";

class HomePage extends Component {
  static tag = "home-page";

  render() {
    return html`
      <section class="hero">
        <div class="hero-content">
          <span class="eyebrow">@devera/bedrockjs</span>
          <h1>Build faster. Ship cleaner. No fuss.</h1>
          <p class="lede">
            A compact foundation for routing, components, and reactive state.
            Works with Deno, Node, and the browser. Simple pieces, steady results.
          </p>
          <div class="cta-row">
            <a class="btn primary" href="https://jsr.io/@devera/bedrockjs@0.1.1">
              Get started
            </a>
            <a class="btn ghost" href="https://jsr.io/@devera/bedrockjs@0.1.1">
              View on JSR
            </a>
          </div>
          <div class="stat-grid">
            <div class="stat-card">
              <p class="stat-number">0.1.1</p>
              <p class="stat-label">Latest release</p>
            </div>
            <div class="stat-card">
              <p class="stat-number">Universal</p>
              <p class="stat-label">Deno, Node & Web</p>
            </div>
            <div class="stat-card">
              <p class="stat-number">Tiny</p>
              <p class="stat-label">Small API surface</p>
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
      </section>

      <section class="hero-card">
        <p class="card-title">Quick start</p>
        <pre><code>deno add jsr:@devera/bedrockjs

import { createRouter } from "jsr:@devera/bedrockjs@0.1.1";

createRouter({
  routes: [{ path: "/", component: "home-page" }]
});</code></pre>
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
