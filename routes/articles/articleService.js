const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO articles(naziv, formatiranNaziv, nazivMedija, tipMedija, tekst, datum, link, naslovnaSlika) 
        values(?,?,?,?,?,?,?,?)`,
      [data.naziv, data.formatiranNaziv, data.nazivMedija, data.tipMedija, data.tekst, data.datum, data.link, data.naslovnaSlika],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getArticles: (callBack) => {
    pool.query(`SELECT * FROM articles`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getArticleByName: (name, callBack) => {
    pool.query(`SELECT * FROM articles WHERE formatiranNaziv = ?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateArticle: (data, callBack) => {
    pool.query(`UPDATE articles SET naziv=?, formatiranNaziv=?, nazivMedija=?, tipMedija=?, tekst=?, datum=?, link=? WHERE id=?`, [data.naziv, data.formatiranNaziv, data.nazivMedija, data.tipMedija, data.tekst, data.datum, data.link, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateNaslovnuSliku: (data, callBack) => {
    pool.query(`UPDATE articles SET naslovnaSlika=? WHERE id=?`, [data.naslovnaSlika, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  deleteArticle: (id, callBack) => {
    pool.query(`DELETE FROM articles WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  getSelectedImage: (id, callBack) => {
    pool.query(`SELECT naslovnaSlika FROM articles WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
