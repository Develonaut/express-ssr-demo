var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  req.query.publisher === "google"
    ? res.render("thankyou")
    : res.render("secretThankYou");
});

module.exports = router;
