const { create, getDonators, getDonatorByName, updateDonator, updateLogoDonatora, deleteDonator, getSelectedImage } = require("./donatorsService");

module.exports = {
  createDonator: (req, res) => {
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

  getDonatorByName: (req, res) => {
    const name = req.params.name;
    getDonatorByName(name, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Traženi donator nije pronađen",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getDonators: (req, res) => {
    getDonators((err, results) => {
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

  updateDonator: (req, res) => {
    updateDonator(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Donator uspješno update-ovan!",
      });
    });
  },

  updateLogoDonatora: (req, res) => {
    updateLogoDonatora(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Logo donatora uspješno update-ovan!",
      });
    });
  },

  deleteDonator: (req, res) => {
    const data = req.params.id;
    deleteDonator(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Donator nije pronađen",
        });
      }
      return res.json({
        success: 1,
        message: "Donator uspješno obrisan",
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
