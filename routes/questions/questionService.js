const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO questions(nazivPonude, imePrezime, email, telefon, poruka, tipKontakta) 
        values(?,?,?,?,?,?)`,
      [data.nazivPonude, data.imePrezime, data.email, data.telefon, data.poruka, data.tipKontakta],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getQuestions: (callBack) => {
    pool.query(`SELECT * FROM questions`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteQuestion: (id, callBack) => {
    pool.query(`DELETE FROM questions WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
