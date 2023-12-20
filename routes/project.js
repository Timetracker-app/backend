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
router.get("/:projekt", getProject);
router.post("/", addProject);
router.put("/:projekt", updateProject);
router.delete("/:projekt", deleteProject);

module.exports = router;
