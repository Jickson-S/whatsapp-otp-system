const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const User = require("./models/User");

require("./services/whatsapp");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const whatsappRoutes = require("./routes/whatsappRoutes");
const adminUserRoutes =require("./routes/adminUserRoutes");
const adminRoutes =require("./routes/adminRoutes");

const adminAuthRoutes =require("./routes/adminAuthRoutes");





const app = express();


// middleware
app.use(cors());
app.use(express.json());


// database
connectDB();

// test API
app.get("/", (req, res) => {
    res.json({
        message: "WhatsApp OTP Server Running"
    });

});

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/whatsapp", whatsappRoutes);

app.use("/api/admin",adminUserRoutes);

app.use("/api/admin",adminRoutes);

app.use("/api/admin-auth",adminAuthRoutes);
/// Socket.IO setup
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

global.io = io;

io.on("connection", (socket) => {
    console.log("Socket Connected");
});

// server start
server.listen(process.env.PORT, () => {
    console.log(
        `Server running on ${process.env.PORT}`
    );
});