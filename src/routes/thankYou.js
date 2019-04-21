import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.render("thankYou", { title: "Thank You" });
});

module.exports = router;
