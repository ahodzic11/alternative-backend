const { create, getProjects, getProjectByName, updateProject, updateNaslovnuSliku, deleteProject, getSelectedImage } = require("./projectService");

module.exports = {
  createProject: (req, res) => {
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

  getProjectByName: (req, res) => {
    const name = req.params.name;
    getProjectByName(name, (err, results) => {
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

  getProjects: (req, res) => {
    getProjects((err, results) => {
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

  updateProject: (req, res) => {
    updateProject(req.body, (err, results) => {
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

  deleteProject: (req, res) => {
    const data = req.params.id;
    deleteProject(data, (err, results) => {
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
