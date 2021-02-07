import { config } from "dotenv";
import fs from "fs";
import crypto from "crypto";
import colors from "colors";

// Load Environment
config({ path: "./.env" });

var jwt_secret = crypto.randomBytes(20).toString("hex");

function addConfigToEnv(key, value) {
  fs.appendFile(".env", `\n${key}=${value}`, function (err) {
    if (err) throw err;
    var stripString = key.split("_").join(" ").toString().toLowerCase();
    console.log(`${stripString} generated : ${value}`.bgYellow);
    process.exit();
  });
}

function writeKeyValueToEnv(key) {
  //   append key=value to .env
  if (key === "JWT_SECRET") addConfigToEnv(key, jwt_secret);
}

function replaceKeyValueToEnv(key) {
  // replace key=value to .env
  var value = process.env[key];
  var data = fs.readFileSync(".env", "utf-8");
  var key_value = `${key}=${value}`;

  var newValue = data.replace(new RegExp("\n" + key_value), "");
  // replace .env with new configs
  fs.writeFileSync(".env", newValue, "utf-8");

  writeKeyValueToEnv(key);
}

function checkKeyValueExits(key) {
  fs.readFile(".env", function (err, data) {
    if (err) throw err;
    if (data.includes(key)) {
      // check key value
      replaceKeyValueToEnv(key);
    } else {
      writeKeyValueToEnv(key);
    }
  });
}

if (process.argv[2] === "jwt") {
  checkKeyValueExits("JWT_SECRET");
} else {
  console.log("No argument provided");
}
