import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "dotenv/config";
import cors from "cors";

// get the resolved path to the file
const __filename = fileURLToPath(import.meta.url);
// get the name of the directory
const __dirname = path.dirname(__filename);

import router from "./routes/index.js";

const app = express();

const whitelist = process.env.WHITELIST;

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

export default app;
