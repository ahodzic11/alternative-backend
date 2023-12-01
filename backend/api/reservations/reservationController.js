const { create, getReservations, deleteReservation } = require("./reservationService");

module.exports = {
  createReservation: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getReservations: (req, res) => {
    getReservations((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  deleteReservation: (req, res) => {
    const data = req.params.id;
    deleteReservation(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Projekat nije pronađen",
        });
      }
      return res.json({
        success: 1,
        message: "Projekat uspješno obrisan",
      });
    });
  },
};
