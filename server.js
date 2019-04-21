import express from "express";
import establishViewEngine from "./src/conf/viewEngine";
import establishMiddleware from "./src/conf/middleware";
import establishRoutes from "./src/conf/routes";

const server = express();
establishViewEngine(server);
establishMiddleware(server);
establishRoutes(server);

module.exports = server;
