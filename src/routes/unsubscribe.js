import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.render("unsubscribe", { title: "Unsubscribe" });
});

module.exports = router;
