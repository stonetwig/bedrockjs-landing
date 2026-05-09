import { Component, html, keyed } from "@rendly/bedrockjs";
import { syncedModel } from "@rendly/bedrockjs/sync";

const Message = syncedModel("message", {
  fields: {
    id: "string",
    text: "string",
    timestamp: "datetime",
    clientId: "string",
  },
});

const clientId = crypto.randomUUID().slice(0, 8);

function isMissingStoreError(error: unknown) {
  return error instanceof DOMException && error.name === "NotFoundError";
}

function readMessages() {
  try {
    return Message.all() as Array<{
      id: string;
      text: string;
      timestamp: string | Date;
      clientId: string;
    }>;
  } catch (error) {
    if (isMissingStoreError(error)) return [];
    throw error;
  }
}

class ExamplesChat extends Component {
  static tag = "examples-chat";

  static properties = {
    draft: { type: String, default: "" },
  };

  declare draft: string;

  send = async (e: Event) => {
    e.preventDefault();
    const text = this.draft.trim();
    if (!text) return;

    await Message.create({
      id: crypto.randomUUID(),
      text,
      timestamp: new Date(),
      clientId,
    });

    this.draft = "";
    queueMicrotask(() => this.scrollToBottom());
  };

  scrollToBottom() {
    const stream = this.querySelector(".chat-stream") as HTMLElement | null;
    if (stream) stream.scrollTop = stream.scrollHeight;
  }

  updated() {
    this.scrollToBottom();
  }

  render() {
    const messages = readMessages().slice().sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return html`
      <section class="demo-hero">
        <router-link to="/examples" class="back-link">← All examples</router-link>
        <span class="eyebrow">Real-time stream</span>
        <h2>Live chat</h2>
        <p>
          Each tab is assigned a short client ID. Messages stream in over SSE
          as soon as anyone hits send. Your ID:
          <code>${clientId}</code>
        </p>
      </section>

      <section class="demo-card chat-card">
        <div class="chat-stream">
          ${messages.length === 0
            ? html`<p class="demo-empty">No messages yet — say hi.</p>`
            : messages.map((msg) =>
                keyed(
                  msg.id,
                  html`
                    <div
                      class="chat-message ${msg.clientId === clientId
                        ? "own"
                        : "other"}"
                    >
                      <div class="chat-author">${msg.clientId}</div>
                      <div class="chat-text">${msg.text}</div>
                      <div class="chat-time">
                        ${new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  `,
                )
              )}
        </div>

        <form class="chat-form" on-submit=${this.send}>
          <input
            type="text"
            class="demo-input"
            .value=${this.draft}
            placeholder="Type a message…"
            on-input=${(e: Event) =>
              (this.draft = (e.target as HTMLInputElement).value)}
          />
          <button type="submit" class="btn primary">Send</button>
        </form>
      </section>
    `;
  }
}

ExamplesChat.register();
