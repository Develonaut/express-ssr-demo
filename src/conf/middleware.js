import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sassMiddleware from "node-sass-middleware";
import PATHS from "./paths";

/**
 *
 * Using the initialized Server, attach
 * any middleware we would like to use to the server.
 * @param {object} server
 */
export default server => {
  // Allows JSON to be used for requests.
  // See more options here: https://expressjs.com/en/api.html#express.json
  server.use(express.json());
  // Allows support for encoded URLs in requests.
  // See more options here: https://expressjs.com/en/api.html#express.urlencoded
  server.use(express.urlencoded({ extended: false }));
  // Parses Cookies from the browser and puts them in the request.
  // See more options here: https://github.com/expressjs/cookie-parser#api
  server.use(cookieParser());
  // Log incoming request details.
  // See more options here: https://github.com/expressjs/morgan#readme
  process.env.NODE_ENV === "development"
    ? server.use(logger("dev"))
    : server.use(logger("common"));

  // Allows the usage of SCSS, which will then be transpiled
  // into CSS upon request.
  // See more options here: https://github.com/sass/node-sass-middleware#options
  server.use(
    sassMiddleware({
      src: PATHS.SRC,
      dest: PATHS.PUBLIC,
      indentedSyntax: false, // true = .sass and false = .scss
      sourceMap: true
    })
  );
};
