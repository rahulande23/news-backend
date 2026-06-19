require("dotenv").config();
const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/news");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
