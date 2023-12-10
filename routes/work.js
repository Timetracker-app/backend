const express = require("express");
const router = express.Router();

const { getAllWorks, getWork } = require("../controllers/work");

router.get("/", getAllWorks);
router.get("/:IDdela", getWork);

module.exports = router;
