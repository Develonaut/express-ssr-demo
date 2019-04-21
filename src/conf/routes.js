import express from "express";
import path from "path";
import PATHS from "./paths";
import createError from "http-errors";

/**
 *
 * All possible routes in the server, with a defined
 * url, and the respective router to handle logic.
 */
export const ROUTES = {
  INDEX: { URL: "/", ROUTER: require(path.join(PATHS.ROUTES, "index")) },
  THANK_YOU: {
    URL: "/thank-you",
    ROUTER: require(path.join(PATHS.ROUTES, "thankYou"))
  },
  PRIVACY_POLICY: {
    URL: "/privacy-policy",
    ROUTER: require(path.join(PATHS.ROUTES, "privacyPolicy"))
  },
  COOKIE_POLICY: {
    URL: "/cookie-policy",
    ROUTER: require(path.join(PATHS.ROUTES, "cookiePolicy"))
  },
  TERMS_OF_USE: {
    URL: "/terms-of-use",
    ROUTER: require(path.join(PATHS.ROUTES, "termsOfUse"))
  },
  UNSUBSCRIBE: {
    URL: "/unsubscribe",
    ROUTER: require(path.join(PATHS.ROUTES, "unsubscribe"))
  }
};

/**
 *
 * Using the initialized Server, define available routes,
 * expose our public directory, and setup default error
 * handling if an undefined route is used.
 * @param {object} server
 */
export default server => {
  // Allow Access to the "Public" directory.
  server.use(express.static(PATHS.PUBLIC));
  // Builds Routes based off our ROUTES object.
  Object.keys(ROUTES).forEach(key => {
    const { URL, ROUTER } = ROUTES[key];
    server.use(URL, ROUTER);
  });

  // Catches undefined routes, creates a 404 error and forwards it
  // to next ".use" method on the server. In this case it's our actual
  // error handler.
  server.use((_, __, next) => next(createError(404)));
  server.use((err, req, res) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page.
    res.status(err.status || 500);
    res.render("error");
  });
};
