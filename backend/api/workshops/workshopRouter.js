const { createWorkshop, getWorkshops, getWorkshopByName, updateWorkshop, deleteWorkshop, getWorkshopImagesByName, updateNaslovnuSliku, getSelectedImage, getWorkshopsByArea } = require("./workshopController");
const router = require("express").Router();

router.post("/", createWorkshop);
router.get("/", getWorkshops);
router.get("/area/:area", getWorkshopsByArea);
router.get("/:name", getWorkshopByName);
router.get("/selectedImage/:id", getSelectedImage);
router.patch("/", updateWorkshop);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteWorkshop);
router.get("/dajslike", getWorkshopImagesByName);

module.exports = router;
