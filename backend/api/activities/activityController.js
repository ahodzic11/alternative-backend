const { create, getActivities, getActivityByName, updateActivity, updateNaslovnuSliku, deleteActivity } = require("./activityService");

module.exports = {
  createActivity: (req, res) => {
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

  getActivityByName: (req, res) => {
    const name = req.params.name;
    getActivityByName(name, (err, results) => {
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

  getActivities: (req, res) => {
    getActivities((err, results) => {
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

  updateActivity: (req, res) => {
    updateActivity(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Aktivnost uspješno update-ovana!",
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

  deleteActivity: (req, res) => {
    const data = req.params.id;
    deleteActivity(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Aktivnost nije pronađena",
        });
      }
      return res.json({
        success: 1,
        message: "Aktivnost uspješno obrisana",
      });
    });
  },
};
