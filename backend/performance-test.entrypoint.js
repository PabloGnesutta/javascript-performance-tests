import dotenv from "dotenv";
import http from "http";
import path from "path";
import url from "url";
import fs from "fs";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexHtmlFileAddress = path.join(
  __dirname,
  "../",
  "frontend",
  "index.html"
);

const PORT = process.env.PORT;

// Setup Server:
const server = http.createServer(function (req, res) {
  const pathname = url.parse(req.url, true).pathname;
  const requestedBaseDir = pathname.split("/")[1];
  const extension = pathname.split(".")[1];
  console.log("pathname", pathname);

  // Js/CSS Routes:
  if (["js", "css"].includes(requestedBaseDir)) {
    const contentType =
      requestedBaseDir === "js" ? "application/javascript" : "text/css";
    res.setHeader("Content-Type", contentType);

    const fileToFetch = path.join(__dirname, "../", "frontend", req.url);
    fs.readFile(fileToFetch, (err, content) => {
      if (err) return errorResponse(res, err);
      return res.end(content);
    });
  }

  // WASM
  if (["asm-build"].includes(requestedBaseDir)) {
    const mimeEnd = extension === "wasm" ? "wasm" : "javascript";
    res.setHeader("Content-Type", `application/${mimeEnd}`);

    const fileToFetch = path.join(__dirname, req.url);
    fs.readFile(fileToFetch, (err, content) => {
      if (err) return errorResponse(res, err);
      return res.end(content);
    });
  }

  // Respond with Index.html at '/'
  if (!requestedBaseDir) {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    fs.readFile(indexHtmlFileAddress, function (err, content) {
      if (err) return errorResponse(res, err);
      res.end(content);
    });
  }
});

function errorResponse(res, err) {
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  console.log("error:", err);
  return res.end(
    JSON.stringify({
      success: false,
      message: "Hubo un pequeño error, lo lamento!",
      error: err,
    })
  );
}

// Start Server:
server.listen(PORT, () => console.log("Server listening on PORT:", PORT));
