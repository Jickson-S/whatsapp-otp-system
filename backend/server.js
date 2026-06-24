const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const { initializeClient } = require("./services/whatsapp");

initializeClient()
  .then(() => {
    console.log("WhatsApp service started");
  })
  .catch((err) => {
    console.log("WhatsApp start error:", err.message);
  });

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

const http = require("http");
const { Server } = require("socket.io");

const app = express();

// middleware
app.use(cors());

app.use(express.json());

// database
connectDB();

// test api
app.get("/", (req, res) => {
  res.json({
    message: "WhatsApp OTP Server Running",
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin-auth", adminAuthRoutes);

// socket
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://whatsapp-otp-system.vercel.app"],
    methods: ["GET", "POST"],
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
