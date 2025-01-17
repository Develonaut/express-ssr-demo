import path from "path";

/**
 *
 * All paths used within the server.
 */
export default {
  PUBLIC: path.join(__dirname, "../../public/"),
  SRC: path.join(__dirname, "../src/"),
  ROUTES: path.join(__dirname, "../routes/"),
  VIEWS: path.join(__dirname, "../views/"),
  PARTIALS: path.join(__dirname, "../views/partials/")
};
