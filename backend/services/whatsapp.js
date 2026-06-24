const QRCode = require("qrcode");
const { Client, LocalAuth } = require("whatsapp-web.js");

let client = null;
let lastQR = null;

// Create WhatsApp Client
function createClient() {
  const whatsappClient = new Client({
    authStrategy: new LocalAuth({
      clientId: "render-whatsapp",
      // Render Persistent Disk
      // Use "./whatsapp-session" locally
      dataPath:
        process.env.NODE_ENV === "production"
          ? "/data/whatsapp-session"
          : "./whatsapp-session",
    }),
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    },
  });

  // QR Event
  whatsappClient.on("qr", async (qr) => {
    console.log("QR Generated");
    if (qr === lastQR) {
      return;
    }
    lastQR = qr;
    try {
      const qrImage = await QRCode.toDataURL(qr);
      if (global.io) {
        global.io.emit("whatsapp-qr", qrImage);
      }
      console.log("QR length:", qrImage.length); 
      console.log(qrImage);
      console.log("QR Sent to frontend");
    } catch (error) {
      console.log("QR Error:", error.message);
    }
  });

  // Authenticated
  whatsappClient.on("authenticated", () => {
    console.log("WhatsApp Authenticated ✅");
  });

  // Ready
  whatsappClient.on("ready", () => {
    console.log("WhatsApp Connected ✅");
  });

  //Loading Screen
  whatsappClient.on("loading_screen", (percent, message) => {
    console.log("Loading:", percent, message);
  });

  //state Changes
  whatsappClient.on("change_state", (state) => {
    console.log("State:", state);
  });

  //Auth Failure
  whatsappClient.on("auth_failure", (msg) => {
    console.log("Authentication failed:", msg);
  });

  //Disconnect
  whatsappClient.on("disconnected", (reason) => {
    console.log("WhatsApp Disconnected:", reason);
    lastQR = null;
  });
  return whatsappClient;
}

//Initialize Client
async function initializeClient() {
  try {
    if (client) {
      return client;
    }
    client = createClient();
    await client.initialize();
    return client;
  } catch (error) {
    console.log("Initialize Error:", error.message);
    throw error;
  }
}

//Restart Client
async function restartClient() {
  try {
    if (client) {
      await client.destroy();
      client = null;
    }
    return await initializeClient();
  } catch (error) {
    console.log("Restart Error:", error.message);
    throw error;
  }
}

//Logout Client
async function logoutClient() {
  try {
    if (!client) {
      return;
    }
    await client.logout();
    await client.destroy();
    client = null;
    console.log("WhatsApp Logged Out");
  } catch (error) {
    console.log("Logout Error:", error.message);
    throw error;
  }
}

//Send Message
async function sendMessage(number, message) {
  try {
    if (!client) {
      throw new Error("WhatsApp client not initialized");
    }
    if (!client.info) {
      throw new Error("WhatsApp not connected");
    }
    number = number.replace(/\D/g, "");
    const chatId = `${number}@c.us`;
    const response = await client.sendMessage(chatId, message);
    console.log("Message sent ✅");
    return {
      success: true,
      messageId: response.id._serialized,
    };
  } catch (error) {
    console.log("Send Message Error:", error.message);
    throw error;
  }
}

//Get Client
function getClient() {
  return client;
}

module.exports = {
  initializeClient,
  restartClient,
  logoutClient,
  sendMessage,
  getClient,
};
