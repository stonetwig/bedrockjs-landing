import { configureSync } from "@rendly/bedrockjs/sync";

// Must run before any `syncedModel(...)` call. Imported first in client.ts so
// that ES module hoisting still puts this ahead of the page modules below it.
// The dbName is bumped (vs. the default) so visitors with a stale IndexedDB
// from an earlier build get a clean store instead of an upgrade-blocked error.
configureSync({
  baseUrl: "/sync",
  dbName: "rendly-bedrockjs-landing-v3",
});
