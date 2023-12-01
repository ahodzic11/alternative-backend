const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO reservations(nazivPonude, imePrezime, datum, vrijeme, telefon) 
        values(?,?,?,?,?)`,
      [data.nazivPonude, data.imePrezime, data.datum, data.vrijeme, data.telefon],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getReservations: (callBack) => {
    pool.query(`SELECT * FROM reservations`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteReservation: (id, callBack) => {
    pool.query(`DELETE FROM reservations WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
