const express = require("express");
const router = express.Router();

const { getAllProjects, getProject } = require("../controllers/project");

router.get("/", getAllProjects);
router.get("/:projekt", getProject);

module.exports = router;
