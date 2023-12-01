const { createQuestion, getQuestions, deleteQuestion } = require("./questionController");
const router = require("express").Router();

router.post("/", createQuestion);
router.get("/", getQuestions);
router.delete("/:id", deleteQuestion);

module.exports = router;
