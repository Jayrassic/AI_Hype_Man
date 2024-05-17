// var express = require("express");
import express from "express";
import { AI } from "../controllers/indexController.js";
const router = express.Router();

/* GET home page. */
router.post("/", AI);

export default router;
