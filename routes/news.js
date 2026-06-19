const express = require("express");
const axios = require("axios");
const router = express.Router();

const BASE_URL = "https://newsapi.org/v2";
const API_KEY = process.env.NEWS_API_KEY;

// GET /api/news/top-headlines?category=&country=us&page=1
router.get("/top-headlines", async (req, res) => {
  const { category = "", country = "us", page = 1, pageSize = 12 } = req.query;
  try {
    const params = { apiKey: API_KEY, country, page, pageSize };
    if (category) params.category = category;

    const { data } = await axios.get(`${BASE_URL}/top-headlines`, { params });
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.response?.data?.message || "Failed to fetch news" });
  }
});

// GET /api/news/search?q=keyword&page=1
router.get("/search", async (req, res) => {
  const { q, page = 1, pageSize = 12, sortBy = "publishedAt" } = req.query;
  if (!q)
    return res.status(400).json({ error: "Query parameter q is required" });

  try {
    const { data } = await axios.get(`${BASE_URL}/everything`, {
      params: { apiKey: API_KEY, q, page, pageSize, sortBy, language: "en" },
    });
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.response?.data?.message || "Search failed" });
  }
});

module.exports = router;
