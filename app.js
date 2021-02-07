import { config } from "dotenv";
import path from "path";

import express, { json } from "express";
// const bodyParser = require('body-parser');
import morgan from "morgan";
import ErrorHandler from "./app/middlewares/ErrorHandler.js";
import DB from "./configs/database.js";
import cookieParser from "cookie-parser";

// securing api packages
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

const __dirname = path.resolve(path.dirname(""));

// Load Environment
config({ path: "./.env" });

// connect to database
DB();

const app = express();

// body requests parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// import routes files
import apiRoutes from "./routes/api/index.js";
const webRoutes = import("./routes/web/index.js");

//development mode middle ware logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(logger);

// sanitize data sql or mongo injection
app.use(mongoSanitize());

// set security headers for api and content policy security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["*"],
        scriptSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net/",
        ],
        connectSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "*"],
        frameSrc: ["'self'"],
      },
    },
  })
);

// prevent XSS attacks
app.use(xss());

// api request rate limiting default : 100 requests in 10minutes
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// enable cors
app.use(cors());

// initialize routers
app.use("/api/v1/", apiRoutes);
// app.use('/', webRoutes);

app.use(express.static(path.join(__dirname, "storage")));

if (process.env.FRONTEND_SERVE === "allow") {
  // handle static files for vue
  app.use(express.static(__dirname + "/public"));

  // Handle Redirect to WebRoutes
  app.use(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

// Handle 404 Requests
app.use("*", (req, res, next) => {
  const error = new Error("Route Not found");
  error.status = 404;
  next(error);
});

// error handler
app.use(ErrorHandler);

// set static storage folder

export default app;
