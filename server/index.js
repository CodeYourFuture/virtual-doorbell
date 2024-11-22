const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const port = 8080;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, "../bell-client/dist")));

app.use(express.static(path.join(__dirname, "../bell-status-client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../bell-client/dist", "index.html"));
});

app.get("/status", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../bell-status-client/dist", "index.html")
  );
});

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", () => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send();
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
