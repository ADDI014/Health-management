
const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const {submitHealth, getHistory} = require("../controllers/health");

router.post("/submit", auth, submitHealth);
router.get("/history", auth, getHistory);

module.exports = router;
