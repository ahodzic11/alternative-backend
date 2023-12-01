const { createProject, getProjects, getProjectByName, updateProject, updateNaslovnuSliku, deleteProject, getSelectedImage } = require("./projectController");
const router = require("express").Router();

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:name", getProjectByName);
router.patch("/", updateProject);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteProject);
router.get("/selectedImage/:id", getSelectedImage);

module.exports = router;
