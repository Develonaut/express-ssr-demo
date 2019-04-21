import hbs from "hbs";
import fs from "fs";
import PATHS from "./paths";

export default server => {
  // View Engine Setup
  server.set("views", PATHS.VIEWS);
  server.set("view engine", "hbs");

  // View Enginer Partial Registration.
  fs.readdirSync(PATHS.PARTIALS).forEach(filename => {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) return;
    const name = matches[1];
    const template = fs.readFileSync(PATHS.PARTIALS + filename, "utf8");
    hbs.registerPartial(name, template);
  });
};
