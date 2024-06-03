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

const { checkAddWork, checkUpdateWork } = require("../middleware/checkWork");
const addTime = require("../middleware/addTime");
const subtractTime = require("../middleware/subtractTime");

router.get("/", getWorks);
//router.get("/:filter", getWorks);
router.get("/:IDdela", getWork);
router.post("/", checkAddWork, addTime, addWork);
router.put("/:IDdela", checkUpdateWork, subtractTime, addTime, updateWork);
router.delete("/:IDdela", deleteWork);

module.exports = router;
