const { createDonator, getDonators, getDonatorByName, updateDonator, updateLogoDonatora, deleteDonator, getSelectedImage } = require("./donatorsController");
const router = require("express").Router();

router.post("/", createDonator);
router.get("/", getDonators);
router.get("/:name", getDonatorByName);
router.patch("/", updateDonator);
router.patch("/updateImage", updateLogoDonatora);
router.delete("/:id", deleteDonator);
router.get("/selectedImage/:id", getSelectedImage);

module.exports = router;
