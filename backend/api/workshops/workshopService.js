const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO workshops(naslov, formatiranNaslov, mjesto, datum, trener, ucesnici, nazivDonatora, nazivProjekta, cilj, opisRadionice, oblastRadionice, naslovnaSlika) 
        values(?,?,?,?,?,?,?,?,?,?,?,?)`,
      [data.naslov, data.formatiranNaslov, data.mjesto, data.datum, data.trener, data.ucesnici, data.nazivDonatora, data.nazivProjekta, data.cilj, data.opisRadionice, data.oblastRadionice, data.naslovnaSlika],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getWorkshops: (callBack) => {
    pool.query(`SELECT * FROM workshops`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getWorkshopByName: (name, callBack) => {
    pool.query(`SELECT * FROM workshops WHERE formatiranNaslov=?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  getWorkshopsByArea: (area, callBack) => {
    pool.query(`SELECT * FROM workshops WHERE oblastRadionice=?`, [area], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getSelectedImage: (id, callBack) => {
    pool.query(`SELECT naslovnaSlika FROM workshops WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateWorkshop: (data, callBack) => {
    pool.query(
      `UPDATE workshops SET naslov=?, formatiranNaslov=?, mjesto=?, datum=?, trener=?, ucesnici=?, nazivDonatora=?, nazivProjekta=?, cilj=?, opisRadionice=?, oblastRadionice=? WHERE id=?`,
      [data.naslov, data.formatiranNaslov, data.mjesto, data.datum, data.trener, data.ucesnici, data.nazivDonatora, data.nazivProjekta, data.cilj, data.opisRadionice, data.oblastRadionice, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateNaslovnuSliku: (data, callBack) => {
    pool.query(`UPDATE workshops SET naslovnaSlika=? WHERE id=?`, [data.naslovnaSlika, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  deleteWorkshop: (id, callBack) => {
    pool.query(`DELETE FROM workshops WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
