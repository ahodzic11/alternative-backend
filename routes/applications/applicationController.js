const { create, getApplications, deleteApplication } = require("./applicationService");

module.exports = {
  createApplication: (req, res) => {
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

  getApplications: (req, res) => {
    getApplications((err, results) => {
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

  deleteApplication: (req, res) => {
    const data = req.params.id;
    deleteApplication(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Prijava nije pronađena",
        });
      }
      return res.json({
        success: 1,
        message: "Prijava uspješno obrisana",
      });
    });
  },
};
