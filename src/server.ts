import { serveDir } from "https://deno.land/std@0.223.0/http/file_server.ts";
import { extname } from "https://deno.land/std@0.223.0/path/mod.ts";

const handler = (req: Request) => {
  const url = new URL(req.url);
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

Deno.serve({ port: 8000 }, handler);
console.log("BedrockJS landing page running on http://localhost:8000");
