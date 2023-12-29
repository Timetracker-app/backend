const express = require("express");
const router = express.Router();

const {
  getAllWorks,
  //getWork,
  getWorks,
  addWork,
  updateWork,
  deleteWork,
} = require("../controllers/work");

const addTime = require("../middleware/addTime");
const checkWork = require("../middleware/checkWork");
const subtractTime = require("../middleware/subtractTime");

router.get("/", getAllWorks);
//router.get("/:IDdela", getWork);
router.get("/:filter", getWorks);
router.post("/", checkWork, addWork, addTime);
router.put("/:IDdela", updateWork);
router.delete("/:IDdela", subtractTime, deleteWork);

module.exports = router;
