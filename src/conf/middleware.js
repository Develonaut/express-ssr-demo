import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sassMiddleware from "node-sass-middleware";
import PATHS from "./paths";

export default server => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(logger("dev"));

  server.use(
    sassMiddleware({
      src: PATHS.SRC,
      dest: PATHS.PUBLIC,
      indentedSyntax: false, // true = .sass and false = .scss
      sourceMap: true
    })
  );
};
