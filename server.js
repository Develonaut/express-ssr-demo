const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const fs = require("fs");
var hbs = require("hbs");

const server = express();

const PATHS = {
  SRC: path.join(__dirname, "src/"),
  PARTIALS: path.join(__dirname, "src/views/partials")
};

// view engine setup
server.set("views", path.join(PATHS.SRC, "views"));
server.set("view engine", "hbs");

fs.readdirSync(PATHS.PARTIALS).forEach(function(filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(PATHS.PARTIALS + "/" + filename, "utf8");
  hbs.registerPartial(name, template);
});

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.use(
  sassMiddleware({
    src: PATHS.SRC,
    dest: path.join(__dirname, "public"),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
  })
);

server.use(express.static(path.join(__dirname, "public")));

// Router;
const indexRouter = require("./src/routes/index");
server.use("/", indexRouter);

server.use("/thank-you", (req, res, next) =>
  res.render("thankYou", { title: "Express: but with ads!" })
);

server.use("/unsubscribe", (req, res, next) =>
  res.render("unsubscribe", { title: "Express: but with ads!" })
);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = server;
