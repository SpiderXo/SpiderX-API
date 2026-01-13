const { VALID_KEYS } = require("../keys");

module.exports = (req, res) => {
  const key = req.headers["x-api-key"];

  if (!VALID_KEYS.includes(key)) {
    return res.status(403).json({ error: "Invalid API Key" });
  }

  res.json({
    status: "online",
    service: "SpiderX API"
  });
};
