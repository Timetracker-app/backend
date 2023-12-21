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

router.get("/", getAllWorks);
//router.get("/:IDdela", getWork);
router.get("/:filter", getWorks);
router.post("/", addWork);
router.put("/:IDdela", updateWork);
router.delete("/:IDdela", deleteWork);

module.exports = router;
