const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");


const client = new Client({

    authStrategy: new LocalAuth({
        clientId: "whatsapp-bot"
    }),

    puppeteer: {
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage"
        ]
    }

});


// QR Code
// client.on("qr", async (qr) => {
//     const qrImage = await qrcode.toDataURL(qr);
//     console.log("Scan QR Code");
//     console.log(qrImage);
// });

// client.on("qr", async (qr) => {
//     const qrImage =
//         await qrcode.toDataURL(qr);
//     global.io.emit(
//         "whatsapp-qr",
//         qrImage
//     );
// });
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
// client.on("ready", () => {
//     console.log("WhatsApp Connected ✅");
// });
client.on("ready", () => {
    global.io.emit(
        "whatsapp-status",
        {
            status: "CONNECTED"
        }
    );
});

// Authentication
client.on("authenticated", () => {

    console.log("WhatsApp Authenticated");

});


// Disconnected
client.on("disconnected", (reason) => {

    console.log(
        "WhatsApp Disconnected",
        reason
    );

});


// create your own function
const sendMessage = async (number, message) => {

    await client.sendMessage(
        number,
        message
    );

};


client.initialize();


module.exports = {
    sendMessage,
    client
};