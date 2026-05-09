import { serveDir } from "@std/http/file-server";
import { extname } from "@std/path";
import {
  createSyncServer,
  denoKvAdapter,
} from "@rendly/bedrockjs/sync/server";

// Sync server backed by Deno KV. On Deno Deploy, Deno.openKv() is called with
// no arguments to use the managed KV. Locally with DENO_KV_PATH set, it uses that
// path (":memory:" or a file path; requires --allow-ffi --allow-write).
const kvPath = Deno.env.get("DENO_KV_PATH");
const kv = kvPath ? await Deno.openKv(kvPath) : await Deno.openKv();

const sync = await createSyncServer({
  storage: denoKvAdapter({ kv }),
  models: ["todo", "counter", "message"],
  basePath: "/sync",
  cors: true,
});

// The example demos are public and unauthenticated, so we wipe all sync data
// every 15 minutes to keep spam and inappropriate content from sticking
// around. Already-connected tabs keep their local IndexedDB copy until they
// next reload, but anyone arriving fresh gets a clean slate.
const CLEAR_INTERVAL_MS = 15 * 60 * 1000;
const SYNC_KEY_PREFIX = ["bedrockjs"];

async function clearSyncData() {
  let count = 0;
  const deletes: Promise<void>[] = [];
  for await (const entry of kv.list({ prefix: SYNC_KEY_PREFIX })) {
    deletes.push(kv.delete(entry.key));
    count++;
  }
  await Promise.all(deletes);
  if (count > 0) {
    console.log(`[sync] cleared ${count} keys at ${new Date().toISOString()}`);
  }
}

setInterval(() => {
  clearSyncData().catch((err) => console.error("[sync] clear failed:", err));
}, CLEAR_INTERVAL_MS);

const handler = (req: Request): Response | Promise<Response> => {
  const url = new URL(req.url);

  if (url.pathname.startsWith("/sync/")) {
    return sync(req);
  }

  const hasExtension = extname(url.pathname) !== "";
  if (url.pathname === "/" || !hasExtension) {
    url.pathname = "/index.html";
  }

  return serveDir(new Request(url, req), {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: false,
  });
};

const port = Number(Deno.env.get("PORT") ?? "8000");
Deno.serve({ port }, handler);
console.log(`BedrockJS landing page running on http://localhost:${port}`);
console.log(
  `[sync] auto-clearing demo data every ${CLEAR_INTERVAL_MS / 60000} minutes`,
);
