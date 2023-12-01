const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO donators(naziv, formatiranNaziv, link, podrska, naslovnaSlika) 
        values(?,?,?,?,?)`,
      [data.naziv, data.formatiranNaziv, data.link, data.podrska, data.naslovnaSlika],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getDonators: (callBack) => {
    pool.query(`SELECT * FROM donators`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getDonatorByName: (name, callBack) => {
    pool.query(`SELECT * FROM donators WHERE formatiranNaziv = ?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateDonator: (data, callBack) => {
    pool.query(`UPDATE donators SET naziv=?, formatiranNaziv=?, link=?, podrska=? WHERE id=?`, [data.naziv, data.formatiranNaziv, data.link, data.podrska, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateLogoDonatora: (data, callBack) => {
    pool.query(`UPDATE donators SET naslovnaSlika=? WHERE id=?`, [data.naslovnaSlika, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  deleteDonator: (id, callBack) => {
    pool.query(`DELETE FROM donators WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  getSelectedImage: (id, callBack) => {
    pool.query(`SELECT naslovnaSlika FROM donators WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
