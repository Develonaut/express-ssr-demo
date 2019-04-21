import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.render("privacyPolicy", { title: "Unsubscribe" });
});

module.exports = router;
