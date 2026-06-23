const QRCode = require("qrcode");
const { Client, LocalAuth } = require("whatsapp-web.js");


// Prevent creating multiple WhatsApp clients
if (!global.whatsappClient) {


    global.whatsappClient = new Client({

        authStrategy: new LocalAuth({

            clientId: "render-whatsapp",

            // Keep this folder persistent
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


}


const client = global.whatsappClient;



let lastQR = null;



// QR Event

client.on("qr", async (qr) => {


    console.log("QR Generated");


    // Avoid sending same QR again

    if (qr === lastQR) {

        console.log("Duplicate QR ignored");

        return;

    }


    lastQR = qr;



    try {


        const qrImage = await QRCode.toDataURL(qr);



        if (global.io) {


            global.io.emit(

                "whatsapp-qr",

                qrImage

            );

            console.log("QR length:", qrImage.length);
            console.log(qrImage);
            console.log(
                "QR Sent to frontend"
            );


        } else {


            console.log(
                "Socket not ready"
            );


        }



    } catch (error) {


        console.log(
            "QR Error:",
            error.message
        );


    }



});





// Authentication success

client.on("authenticated", () => {


    console.log(
        "WhatsApp Authenticated ✅"
    );


});





// Connected

client.on("ready", () => {


    console.log(
        "WhatsApp Connected ✅"
    );


});





// Auth failed

client.on("auth_failure", (msg) => {


    console.log(

        "Authentication failed:",

        msg

    );


});





// Disconnected

client.on("disconnected", (reason) => {


    console.log(

        "WhatsApp Disconnected:",

        reason

    );


    lastQR = null;


});





// Send message function

const sendMessage = async (number, message) => {


    try {


        if (!client.info) {


            throw new Error(
                "WhatsApp not connected"
            );


        }



        await client.sendMessage(

            `${number}@c.us`,

            message

        );



        console.log(
            "Message sent ✅"
        );



    } catch (error) {



        console.log(

            "Send message error:",

            error.message

        );


    }



};





// Initialize only once

if (!global.whatsappInitialized) {


    global.whatsappInitialized = true;


    client.initialize();


}





module.exports = {


    client,

    sendMessage


};