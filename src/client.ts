import {
  Component,
  RouterLink,
  RouterOutlet,
  createRouter,
  html,
} from "jsr:@devera/bedrockjs@0.1.1";

import "./components/demo-counter.ts";
import "./components/cube-3d.ts";
import "./pages/home.ts";
import "./pages/docs.ts";
import "./pages/routes.ts";

RouterLink.register();
RouterOutlet.register();

class AppRoot extends Component {
  static tag = "app-root";

  render() {
    return html`
      <div class="app">
        <header class="top-bar">
          <div class="brand">
            <div>
              <p class="brand-title">BedrockJS</p>
              <p class="brand-sub">a javascript framework without the fuss</p>
            </div>
          </div>
          <nav class="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/docs">Docs</router-link>
            <router-link to="/routes">Routes</router-link>
          </nav>
        </header>

        <main class="content">
          <router-outlet></router-outlet>
        </main>

        <footer class="footer">
          <p>Built with BedrockJS.</p>
          <p>Licensed under MIT and sponsored by <a href="https://devera.se">Devera</a>.</p>
        </footer>
      </div>
    `;
  }
}

AppRoot.register();

createRouter({
  routes: [
    { path: "/", component: "home-page" },
    { path: "/docs", component: "docs-page" },
    { path: "/routes", component: "routes-page" },
  ],
});
