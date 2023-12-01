const { createApplication, getApplications, deleteApplication } = require("./applicationController");
const router = require("express").Router();

router.post("/", createApplication);
router.get("/", getApplications);
router.delete("/:id", deleteApplication);

module.exports = router;
