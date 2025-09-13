const express = require("express");
const router = express.Router();
const flatController = require("../controllers/flatController");

router.post("/", flatController.createFlat);
router.get("/", flatController.getFlat);

module.exports = router;
