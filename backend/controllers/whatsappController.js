const {
  getClient,
  restartClient,
  logoutClient,
} = require("../services/whatsapp");

exports.status = async (req, res) => {
  try {
    const client = getClient();
    const connected = !!client?.info?.wid?.user;

    res.json({
      connected,
      status: connected ? "CONNECTED" : "DISCONNECTED",
      number: connected ? client.info.wid.user : null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    await logoutClient();
    res.json({
      success: true,
      message: "WhatsApp logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.restart = async (req, res) => {
  try {
    await restartClient();
    res.json({
      success: true,
      message: "WhatsApp restarted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
