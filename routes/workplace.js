const express = require("express");
const router = express.Router();

const { getAllWorkplaces, getWorkplace } = require("../controllers/workplace");

router.get("/", getAllWorkplaces);
router.get("/:stroj", getWorkplace);

module.exports = router;
