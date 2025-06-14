const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5`,
      {
        headers: { "User-Agent": "MapApp" },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

app.listen(4000, () => {
  console.log("Proxy server running on http://localhost:4000");
});
