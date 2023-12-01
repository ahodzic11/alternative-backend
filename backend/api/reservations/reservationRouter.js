const { createReservation, getReservations, deleteReservation } = require("./reservationController");
const router = require("express").Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.delete("/:id", deleteReservation);

module.exports = router;
