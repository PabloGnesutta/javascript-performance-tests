require("dotenv").config();
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");

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
  console.log("pathname", pathname);
//   console.log("requestedBaseDir", requestedBaseDir);

  // Js/CSS Routes:
  if (requestedBaseDir === "js" || requestedBaseDir === "css") {
    const contentType =
      requestedBaseDir === "js" ? "application/javascript" : "text/css";
    res.setHeader("Content-Type", contentType);

    const fileToFetch = path.join(__dirname, "../", "frontend", req.url);
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
