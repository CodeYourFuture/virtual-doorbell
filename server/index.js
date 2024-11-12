const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", () => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send();
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running");
