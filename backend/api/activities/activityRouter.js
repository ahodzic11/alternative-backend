const { createActivity, getActivities, updateNaslovnuSliku, deleteActivity, updateActivity, getActivityByName } = require("./activityController");
const router = require("express").Router();

router.post("/", createActivity);
router.get("/", getActivities);
router.get("/:name", getActivityByName);
router.patch("/", updateActivity);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteActivity);

module.exports = router;
