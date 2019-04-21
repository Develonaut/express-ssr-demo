import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  res.render("termsOfUse", { title: "Terms Of Use" });
});

module.exports = router;
