import qrcode from 'qrcode-terminal'
import whatsappweb from 'whatsapp-web.js'
const { Client, LocalAuth } = whatsappweb

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: '.auth' }),
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-extensions',
            '--disable-background-networking',
            '--disable-default-apps',
            '--disable-sync',
            '--disable-translate',
            '--metrics-recording-only',
            '--mute-audio',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--single-process'
        ]
    }
})

client.on("qr", async(qr)=>{
    const qrImage =
        await qrcode.toDataURL(qr);
    console.log("QR Generated");
    if(global.io){
        global.io.emit(
            "whatsapp-qr",
            qrImage
        );
    }
});


client.on("ready",()=>{
    console.log(
        "WhatsApp Connected ✅"
    );

});

const sendMessage = async (number, message) => {
    await client.sendMessage(
        `${number}@c.us`,
        message
    );
};

client.initialize();

module.exports = {
    client,
    sendMessage
};