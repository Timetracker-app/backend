const express = require("express");
const router = express.Router();

const {
  getAllWorkplaces,
  addWorkplace,
  updateWorkplace,
  deleteWorkplace,
} = require("../controllers/workplace");

router.get("/", getAllWorkplaces);
router.post("/", addWorkplace);
router.put("/:stroj", updateWorkplace);
router.delete("/:stroj", deleteWorkplace);

module.exports = router;
