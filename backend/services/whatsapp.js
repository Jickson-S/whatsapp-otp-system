const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrImage = await QRCode.toDataURL(qr);
const client = new Client({
    authStrategy: new LocalAuth({ dataPath: ".auth" }),
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

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });

    console.log("QR Generated");

    if (global.io) {
        global.io.emit("whatsapp-qr", qr);
    }
});

client.on("ready", () => {
    console.log("WhatsApp Connected ✅");
});

const sendMessage = async (number, message) => {
    await client.sendMessage(`${number}@c.us`, message);
};

client.initialize();

module.exports = {
    client,
    sendMessage
};