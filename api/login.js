module.exports = (req, res) => {
  const { username, password } = req.body;

  if (username === "spiderx" && password === "123456") {
    return res.json({
      success: true,
      apiKey: "SPIDERX-KEY-123456"
    });
  }

  res.status(401).json({ error: "Invalid credentials" });
};
