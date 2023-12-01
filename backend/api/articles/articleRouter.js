const { createArticle, getArticles, getArticleByName, updateArticle, updateNaslovnuSliku, deleteArticle, getSelectedImage } = require("./articleController");
const router = require("express").Router();

router.post("/", createArticle);
router.get("/", getArticles);
router.get("/:name", getArticleByName);
router.patch("/", updateArticle);
router.patch("/updateImage", updateNaslovnuSliku);
router.delete("/:id", deleteArticle);
router.get("/selectedImage/:id", getSelectedImage);

module.exports = router;
