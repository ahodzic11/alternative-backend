const { createNews, getNews, getNewsByName, updateNews, updateNaslovnuSliku, deleteNews, getSelectedImage } = require("./newsController");
const router = require("express").Router();

router.post("/", createNews);
router.get("/", getNews);
router.get("/:name", getNewsByName);
router.patch("/", updateNews);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteNews);
router.get("/selectedImage/:id", getSelectedImage);

module.exports = router;
