import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.render("cookiePolicy", { title: "Cookie Policy" });
});

module.exports = router;
