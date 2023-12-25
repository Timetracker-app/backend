const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");

router.get("/", getAllProjects);
router.post("/", addProject);
router.put("/:projekt", updateProject);
router.delete("/:projekt", deleteProject);

module.exports = router;
