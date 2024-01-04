const express = require("express");
const router = express.Router();

const {
  getAllWorks,
  getWorks,
  addWork,
  updateWork,
  deleteWork,
} = require("../controllers/work");

const checkWork = require("../middleware/checkWork");
const addTime = require("../middleware/addTime");
const subtractTime = require("../middleware/subtractTime");

router.get("/", getAllWorks);
router.get("/:filter", getWorks);
router.post("/", checkWork, addTime, addWork);
router.put("/:IDdela", checkWork, subtractTime, addTime, updateWork);
router.delete("/:IDdela", subtractTime, deleteWork);

module.exports = router;
