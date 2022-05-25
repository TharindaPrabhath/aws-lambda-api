import express from "express";

// controllers
import {
  handleContactUs,
  handleNotify,
} from "../controllers/support.controller";

const router = express.Router();

router.post("/contact-us", handleContactUs);

router.post("/notify", handleNotify);

module.exports = router;
