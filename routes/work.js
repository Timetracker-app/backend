const express = require("express");
const router = express.Router();

const {
  //getAllWorks,
  getWork,
  getWorks,
  addWork,
  updateWork,
  deleteWork,
} = require("../controllers/work");

const checkWork = require("../middleware/checkWork");
const addTime = require("../middleware/addTime");
const subtractTime = require("../middleware/subtractTime");

router.get("/", getWorks);
//router.get("/:filter", getWorks);
router.get("/:IDdela", getWork);
router.post("/", checkWork, addTime, addWork);
router.put("/:IDdela", checkWork, subtractTime, addTime, updateWork);
router.delete("/", deleteWork);

module.exports = router;
