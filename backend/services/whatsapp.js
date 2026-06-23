const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");


const client = new Client({

    authStrategy: new LocalAuth({
        clientId:"whatsapp-bot"
    }),

    puppeteer: {

        headless:true,

        executablePath:
        process.env.CHROME_PATH,

        args:[
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage"
        ]

    }

});


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
        "WhatsApp Connected"
    );


    if(global.io){

        global.io.emit(
            "whatsapp-status",
            {
                status:"CONNECTED"
            }
        );

    }

});



const sendMessage = async(number,message)=>{


    await client.sendMessage(
        `${number}@c.us`,
        message
    );


};



client.initialize();



module.exports={
    client,
    sendMessage
};