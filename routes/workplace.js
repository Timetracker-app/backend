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
router.get("/:name", getWorkplace);
router.post("/", addWorkplace);
router.put("/:name", updateWorkplace);
router.delete("/:name", deleteWorkplace);

module.exports = router;
