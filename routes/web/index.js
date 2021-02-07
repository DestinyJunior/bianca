import path from "path";
import express from "express";
const webRoutes = express.Router();

const __dirname = path.resolve(path.dirname(""));

// add web routes below

webRoutes.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

export default webRoutes;
