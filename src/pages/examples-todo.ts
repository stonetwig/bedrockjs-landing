import { Component, html, keyed } from "@rendly/bedrockjs";
import { syncedModel } from "@rendly/bedrockjs/sync";

const Todo = syncedModel("todo", {
  fields: {
    id: "string",
    title: "string",
    completed: "boolean",
    createdAt: "datetime",
    updatedAt: "datetime",
  },
});

class ExamplesTodo extends Component {
  static tag = "examples-todo";

  static properties = {
    draft: { type: String, default: "" },
  };

  declare draft: string;

  add = async (e: Event) => {
    e.preventDefault();
    const title = this.draft.trim();
    if (!title) return;
    const now = new Date();
    await Todo.create({
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    });
    this.draft = "";
  };

  toggle = (id: string, completed: boolean) => {
    Todo.update(id, { completed: !completed, updatedAt: new Date() });
  };

  remove = (id: string) => {
    Todo.delete(id);
  };

  render() {
    const items = Todo.all();
    const remaining = items.filter((t: { completed: boolean }) => !t.completed)
      .length;

    return html`
      <section class="demo-hero">
        <router-link to="/examples" class="back-link">← All examples</router-link>
        <span class="eyebrow">Synced model</span>
        <h2>Todo list</h2>
        <p>
          Add, complete, or delete items. Open this page in two tabs and watch
          them stay in sync. Go offline in DevTools — mutations queue locally
          and drain on reconnect.
        </p>
      </section>

      <section class="demo-card">
        <form class="todo-form" on-submit=${this.add}>
          <input
            type="text"
            class="demo-input"
            .value=${this.draft}
            placeholder="What needs doing?"
            on-input=${(e: Event) =>
              (this.draft = (e.target as HTMLInputElement).value)}
          />
          <button type="submit" class="btn primary">Add</button>
        </form>

        ${items.length === 0
          ? html`<p class="demo-empty">Nothing here yet. Add the first task.</p>`
          : html`
              <ul class="todo-list">
                ${items.map((t: {
                  id: string;
                  title: string;
                  completed: boolean;
                }) =>
                  keyed(
                    t.id,
                    html`
                      <li class="todo-item ${t.completed ? "done" : ""}">
                        <input
                          type="checkbox"
                          .checked=${t.completed}
                          on-change=${() => this.toggle(t.id, t.completed)}
                        />
                        <span class="todo-title">${t.title}</span>
                        <button
                          class="todo-delete"
                          on-click=${() => this.remove(t.id)}
                          aria-label="Delete"
                        >×</button>
                      </li>
                    `,
                  )
                )}
              </ul>
            `}

        <p class="demo-meta">${remaining} remaining · ${items.length} total</p>
      </section>
    `;
  }
}

ExamplesTodo.register();
