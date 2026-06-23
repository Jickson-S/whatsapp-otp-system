const QRCode = require("qrcode");
const { Client, LocalAuth } = require("whatsapp-web.js");


const client = new Client({

    authStrategy: new LocalAuth({
        clientId: "render-whatsapp",
        dataPath: "./whatsapp-session"
    }),


    restartOnAuthFail: true,


    puppeteer: {
        headless: true,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--single-process"
        ]
    }

});



client.on("qr", async (qr) => {

    console.log("QR Generated");


    const qrImage = await QRCode.toDataURL(qr);


    if (global.io) {

        global.io.emit(
            "whatsapp-qr",
            qrImage
        );
        console.log(
    "QR length:",
    qrImage.length
);
 console.log(`base64: ${qrImage}`);
        console.log(
            "QR Sent to frontend"
        );

    }

});



client.on("ready", () => {

    console.log(
        "WhatsApp Connected ✅"
    );

});



client.on("auth_failure", (msg) => {

    console.log(
        "Authentication failed:",
        msg
    );

});



client.on("disconnected", (reason) => {

    console.log(
        "WhatsApp Disconnected:",
        reason
    );

});



const sendMessage = async (number, message) => {

    try {

        await client.sendMessage(
            `${number}@c.us`,
            message
        );


        console.log(
            "Message sent"
        );


    } catch(error) {

        console.log(
            "Send message error:",
            error.message
        );

    }

};



client.initialize();



module.exports = {
    client,
    sendMessage
};