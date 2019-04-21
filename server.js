import express from "express";
import establishViewEngine from "./src/conf/viewEngine";
import establishMiddleware from "./src/conf/middleware";
import establishRoutes from "./src/conf/routes";
// Initialize server.
const server = express();
// Setup the templating engine.
establishViewEngine(server);
// Define any Middleware used.
establishMiddleware(server);
// Set up available routes.
establishRoutes(server);

module.exports = server;
