const { createOffer, getOffers, getOfferByName, updateOffer, updateNaslovnuSliku, deleteOffer, getSelectedImage } = require("./offerController");
const router = require("express").Router();

router.post("/", createOffer);
router.get("/", getOffers);
router.get("/:name", getOfferByName);
router.patch("/", updateOffer);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteOffer);
router.get("/selectedImage/:id", getSelectedImage);

module.exports = router;
