const express = require("express");
const router = express.Router();

const { getAllWorks, getWork, getWorks } = require("../controllers/work");

router.get("/", getAllWorks);
router.get("/:IDdela", getWork);
router.get("/:filter", getWorks);

module.exports = router;
