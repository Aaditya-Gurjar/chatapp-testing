const express = require("express");
const connectDB = require("./db.js");
const cors = require("cors");
const http = require("http");
const path = require('path')
const PORT = 5000;
const { initSocket } = require("./socket/index.js");
const app = express();

const _dirname = path.resolve();


app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Routes

app.use("/auth", require("./Routes/auth_routes.js"));
app.use("/user", require("./Routes/userRoutes.js"));
app.use("/message", require("./Routes/message_routes.js"));
app.use("/conversation", require("./Routes/conversation_routes.js"));

// Server setup
const server = http.createServer(app);

// Socket.io setup
initSocket(server); // Initialize socket.io logic


app.use(express.static(path.join(_dirname, "/frontend/build")))
app.get("*", (_,res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"))
})
// Start server and connect to database
server.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
  connectDB();
});
