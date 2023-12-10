const express = require("express");
const router = express.Router();

const {
  getAllWorkers,
  getWorker,
  addWorker,
  deleteWorker,
  updateWorker,
} = require("../controllers/worker");

router.get("/", getAllWorkers);
router.get("/:ime", getWorker);
router.post("/", addWorker);
router.delete("/:ime", deleteWorker);
router.put("/:ime", updateWorker);

module.exports = router;
