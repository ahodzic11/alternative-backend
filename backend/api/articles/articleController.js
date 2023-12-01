const { create, getArticles, getArticleByName, updateArticle, updateNaslovnuSliku, deleteArticle, getSelectedImage } = require("./articleService");

module.exports = {
  createArticle: (req, res) => {
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

  getArticleByName: (req, res) => {
    const name = req.params.name;
    getArticleByName(name, (err, results) => {
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

  getArticles: (req, res) => {
    getArticles((err, results) => {
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

  updateArticle: (req, res) => {
    updateArticle(req.body, (err, results) => {
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

  deleteArticle: (req, res) => {
    const data = req.params.id;
    deleteArticle(data, (err, results) => {
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
