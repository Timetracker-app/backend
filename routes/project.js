const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");

router.get("/", getAllProjects);
router.get("/:name", getProject);
router.post("/", addProject);
router.put("/:name", updateProject);
router.delete("/:name", deleteProject);

module.exports = router;
