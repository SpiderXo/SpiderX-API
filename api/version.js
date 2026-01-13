const { VALID_KEYS } = require("../keys");

module.exports = (req, res) => {
  const key = req.headers["x-api-key"];

  if (!VALID_KEYS.includes(key)) {
    return res.status(403).json({ error: "Invalid API Key" });
  }

  res.json({
    version: "1.0.0",
    codename: "Black Venom"
  });
};
