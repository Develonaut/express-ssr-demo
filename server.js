var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");

var indexRouter = require("./src/routes/index");

var server = express();

const PATHS = {
  SRC: path.join(__dirname, "src/")
};

// view engine setup
server.set("views", path.join(PATHS.SRC, "views"));
server.set("view engine", "hbs");

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

server.use("/", indexRouter);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = server;
