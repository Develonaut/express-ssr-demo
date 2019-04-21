import hbs from "hbs";
import fs from "fs";
import PATHS from "./paths";

/**
 *
 * Using the initialized Server, define which
 * HTML Templating language we want to use (if any).
 * @param {object} server
 */
export default server => {
  // Inform the server where our template files
  // live and which view engine we will be using.
  server.set("views", PATHS.VIEWS);
  server.set("view engine", "hbs");

  // Register partials with handlebars so we can
  // use them within our templates.
  fs.readdirSync(PATHS.PARTIALS).forEach(filename => {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) return;
    const name = matches[1];
    const template = fs.readFileSync(PATHS.PARTIALS + filename, "utf8");
    hbs.registerPartial(name, template);
  });
};
