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
router.get("/:name", getWorker);
router.post("/", addWorker);
router.delete("/:name", deleteWorker);
router.put("/:name", updateWorker);
router.put("/change-password/:name", checkPassword, changePassword);

module.exports = router;
