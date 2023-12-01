const { create, getOffers, getOfferByName, updateOffer, updateNaslovnuSliku, deleteOffer, getSelectedImage } = require("./offerService");

module.exports = {
  createOffer: (req, res) => {
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

  getOfferByName: (req, res) => {
    const name = req.params.name;
    getOfferByName(name, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Traženi projekat nije pronađen",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getOffers: (req, res) => {
    getOffers((err, results) => {
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

  updateOffer: (req, res) => {
    updateOffer(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Projekat uspješno update-ovan!",
      });
    });
  },

  updateNaslovnuSliku: (req, res) => {
    updateNaslovnuSliku(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Naslovna slika uspješno update-ovana!",
      });
    });
  },

  deleteOffer: (req, res) => {
    const data = req.params.id;
    deleteOffer(data, (err, results) => {
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

  getSelectedImage: (req, res) => {
    const id = req.params.id;
    getSelectedImage(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Tražena slika nije pronađena",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
