const express = require("express");
const router = express.Router();

const {
  getAllWorkplaces,
  getWorkplace,
  addWorkplace,
  updateWorkplace,
  deleteWorkplace,
} = require("../controllers/workplace");

router.get("/", getAllWorkplaces);
router.get("/:stroj", getWorkplace);
router.post("/", addWorkplace);
router.put("/:stroj", updateWorkplace);
router.delete("/:stroj", deleteWorkplace);

module.exports = router;
