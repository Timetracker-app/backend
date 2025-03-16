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
router.get("/:project", getProject);
router.post("/", addProject);
router.put("/:project", updateProject);
router.delete("/:project", deleteProject);

module.exports = router;
