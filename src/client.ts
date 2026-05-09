import {
  Component,
  RouterLink,
  RouterOutlet,
  createRouter,
  html,
} from "@rendly/bedrockjs";

// IMPORTANT: configureSync must run before any module that calls syncedModel.
// ES imports are hoisted, so we import the sync config module first.
import "./sync-config.ts";

import "./components/demo-counter.ts";
import "./components/cube-3d.ts";
import "./pages/home.ts";
import "./pages/docs.ts";
import "./pages/routes.ts";
import "./pages/examples.ts";
import "./pages/examples-todo.ts";
import "./pages/examples-counter.ts";
import "./pages/examples-chat.ts";

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
              <p class="brand-sub">a deno-first framework with sync built in</p>
            </div>
          </div>
          <nav class="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/docs">Docs</router-link>
            <router-link to="/routes">Routes</router-link>
            <router-link to="/examples">Examples</router-link>
          </nav>
        </header>

        <main class="content">
          <router-outlet></router-outlet>
        </main>

        <footer class="footer">
          <p>Built with BedrockJS.</p>
          <p>Licensed under MIT and maintained by <a href="https://jsr.io/@rendly">Rendly</a>.</p>
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
    { path: "/examples", component: "examples-page" },
    { path: "/examples/todo", component: "examples-todo" },
    { path: "/examples/counter", component: "examples-counter" },
    { path: "/examples/chat", component: "examples-chat" },
  ],
});
