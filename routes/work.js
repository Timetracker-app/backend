const express = require("express");
const router = express.Router();

const {
  getWork,
  getWorks,
  addWork,
  updateWork,
  deleteWork,
} = require("../controllers/work");

const {
  checkAddWork,
  checkUpdateWork,
  checkDeleteWork,
} = require("../middleware/checkWork");

router.get("/", getWorks);
router.get("/:workID", getWork);
router.post("/", checkAddWork, addWork);
router.put("/:workID", checkUpdateWork, updateWork);
router.delete("/:workID", checkDeleteWork, deleteWork);

module.exports = router;
