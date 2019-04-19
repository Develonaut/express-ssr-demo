var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  req.query.publisher === "google"
    ? res.render("index", { title: "Express!!! Hey there Google" })
    : res.render("index", { title: "Express: but with ads!" });
});

module.exports = router;
