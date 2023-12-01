const { createUser, getUsers, getUserByName } = require("./userController");
const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:name", getUserByName);

module.exports = router;
