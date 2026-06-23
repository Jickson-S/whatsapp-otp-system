const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const path = require("path");

const client = new Client({

    authStrategy:new LocalAuth({
        clientId:"whatsapp-bot"
    }),

    puppeteer:{

        headless:true,

        executablePath:
        "/opt/render/.cache/puppeteer/chrome/linux-150.0.7871.24/chrome-linux64/chrome",

        args:[
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage"
        ]

    }

});


// QR Generate
client.on("qr", async (qr) => {

    const qrImage = await qrcode.toDataURL(qr);

    console.log("QR Generated");


    if (global.io) {

        global.io.emit(
            "whatsapp-qr",
            qrImage
        );

    }

});


// Connected
client.on("ready", () => {


    console.log(
        "WhatsApp Connected ✅"
    );


    if (global.io) {

        global.io.emit(
            "whatsapp-status",
            {
                status:"CONNECTED"
            }
        );

    }

});


// Authenticated
client.on("authenticated", () => {

    console.log(
        "WhatsApp Authenticated"
    );

});


// Disconnected
client.on("disconnected", (reason)=>{

    console.log(
        "WhatsApp Disconnected",
        reason
    );

});



// Send Message Function
const sendMessage = async(number,message)=>{

    try {


        await client.sendMessage(
            `${number}@c.us`,
            message
        );


        console.log(
            "Message Sent",
            number
        );


    } catch(error){

        console.log(
            "Send Message Error",
            error.message
        );

    }

};



client.initialize();



module.exports = {

    client,
    sendMessage

};