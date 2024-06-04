const express = require("express");
const router = express.Router();

const {
  getAllWorkers,
  getWorker,
  addWorker,
  deleteWorker,
  updateWorker,
  changePassword,
} = require("../controllers/worker");

const checkPassword = require("../middleware/checkPassword");

router.get("/", getAllWorkers);
router.get("/:ime", getWorker);
router.post("/", addWorker);
router.delete("/:ime", deleteWorker);
router.put("/:ime", updateWorker);
router.put("/change-password/:ime", checkPassword, changePassword);

module.exports = router;
