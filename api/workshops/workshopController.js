const { create, getWorkshopByName, getWorkshops, updateWorkshop, deleteWorkshop, getWorkshopImagesByName, updateNaslovnuSliku, getSelectedImage, getWorkshopsByArea } = require("./workshopService");

module.exports = {
  createWorkshop: (req, res) => {
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

  getWorkshopByName: (req, res) => {
    const name = req.params.name;
    getWorkshopByName(name, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Tražena radionica nije pronađena",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getWorkshops: (req, res) => {
    getWorkshops((err, results) => {
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

  getWorkshopsByArea: (req, res) => {
    const area = req.params.area;
    getWorkshopsByArea(area, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Tražena radionica nije pronađena",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getWorkshopImagesByName: (req, res) => {
    getWorkshopImagesByName((err, results) => {
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

  updateWorkshop: (req, res) => {
    updateWorkshop(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Radionica uspješno update-ovana",
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
        message: "Naslovna slika uspješno update-ovana",
      });
    });
  },

  deleteWorkshop: (req, res) => {
    const data = req.params.id;
    deleteWorkshop(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Radionica nije pronađena",
        });
      }
      return res.json({
        success: 1,
        message: "Radionica uspješno obrisana",
      });
    });
  },
};
