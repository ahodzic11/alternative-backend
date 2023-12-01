const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO applications(nazivPonude, imePrezime, email, datumPrijave) 
        values(?,?,?,?)`,
      [data.nazivPonude, data.imePrezime, data.email, data.datumPrijave],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getApplications: (callBack) => {
    pool.query(`SELECT * FROM applications`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteApplication: (id, callBack) => {
    pool.query(`DELETE FROM applications WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
