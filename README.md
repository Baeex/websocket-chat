# WebSocket Chat

A simple real-time chat application built with **Node.js**, **Express**, and **WebSockets (ws)**.

## Features

- Real-time messaging
- User join / leave notifications
- Connected users list
- Message history (in memory)
- No frontend framework required

## 🛠 Tech Stack

- Node.js
- Express
- ws (WebSocket)
- Vanilla HTML & JavaScript

## 📁 Project Structure
```
.
├── chat.js
├── index.html
├── package.json
├── package-lock.json
└── .gitignore
```

## Getting Started
Follow these steps to run the chat locally:

### 1. Install dependencies
Open a terminal in the project folder and run:
```bash
 npm install 
 ```
This installs Express and ws, the packages needed to run the server.
 
### 2. Start server
```bash
 npm start 
 ```
This runs server.js and starts the chat server at http://localhost:3002.

### 3. Open in browser
[Open chat in browser] http://localhost:3002

Open multiple tabs or different browsers to test real-time messaging between users.

⚠️ Notes
  - Messages and users are stored in memory, so data is lost when the server restarts.
  - This project is intended for learning or small demos.

📌 Future Improvements
  - Persist messages in a database
  - Add authentication
  - HTTPS / WSS support
  - Improved UI/UX
