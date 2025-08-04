import express from "express";
import { getPaginationLogs, getSummaryLogs, getTimelineLogs } from "../controllers/log.controller.js"; // Import your controller functions here
import cache from "../middleware/cache.middleware.js";

const router = express.Router();

router.get("/logs", getPaginationLogs);
router.get("/logs/summary", cache, getSummaryLogs);
router.get("/logs/timeline", cache,getTimelineLogs);

export default router;
