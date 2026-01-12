import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
app.use(express.static("."));

let users = [];
let messages = []; // Store message history in memory

// Send updated user list to everyone
function sendUsers() {
  const list = users.map(u => u.name);
  for (const client of wss.clients) {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type: "users", list }));
    }
  }
}

// Send global message (broadcast)
function broadcast(data) {
  for (const client of wss.clients) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  }
}

wss.on("connection", (ws) => {
  // 🧠 Send message history to the new user
  for (const msg of messages) {
    ws.send(JSON.stringify(msg));
  }

  ws.on("message", (data) => {
    const msg = JSON.parse(data);
    
    if (msg.type === "new") {
      ws.name = msg.name;
      users.push({ name: msg.name, ws });
      sendUsers();
      
      // Notify everyone that a user has joined
      broadcast({ type: "notification", text: `🟢 ${msg.name} has joined the chat.` });
      
    } else if (msg.type === "message") {
      // ✅ Save and send message
      const newMessage = { type: "message", name: msg.name, text: msg.text };
      messages.push(newMessage); // 💾 Stored here
      broadcast(newMessage);
    }
  });

  ws.on("close", () => {
    if (ws.name) {
      users = users.filter(u => u.ws !== ws);
      sendUsers();

      // ✅ Notify everyone that a user has left
      broadcast({ type: "notification", text: `🔴 ${ws.name} has left the chat.` });
    }
  });
});

const PORT = 3002;
server.listen(PORT, () =>
  console.log(`🚀 Chat running at http://localhost:${PORT}`)
);
