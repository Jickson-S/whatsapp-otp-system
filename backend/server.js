const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);


const io = new Server(server,{
    cors:{
        origin:[
            "http://localhost:5173",
            "https://whatsapp-otp-system.vercel.app"
        ],
        methods:[
            "GET",
            "POST"
        ]
    }
});


global.io = io;


io.on("connection",(socket)=>{

    console.log(
        "Socket Connected",
        socket.id
    );

});


const PORT = process.env.PORT || 5000;


server.listen(PORT,()=>{

    console.log(
        `Server running on ${PORT}`
    );

});