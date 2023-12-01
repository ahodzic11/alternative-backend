const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO projects(naziv, formatiranNaziv, mjesto, pocetakImplementacije, krajImplementacije, nazivDonatora, projektniGrant, ciljnaGrupa, cilj, opisProjekta, naslovnaSlika) 
        values(?,?,?,?,?,?,?,?,?,?,?)`,
      [data.naziv, data.formatiranNaziv, data.mjesto, data.pocetakImplementacije, data.krajImplementacije, data.nazivDonatora, data.projektniGrant, data.ciljnaGrupa, data.cilj, data.opisProjekta, data.naslovnaSlika],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getProjects: (callBack) => {
    pool.query(`SELECT * FROM projects`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getProjectByName: (name, callBack) => {
    pool.query(`SELECT * FROM projects WHERE formatiranNaziv = ?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateProject: (data, callBack) => {
    pool.query(
      `UPDATE projects SET naziv=?, formatiranNaziv=?, mjesto=?, pocetakImplementacije=?, krajImplementacije=?, nazivDonatora=?, projektniGrant=?, ciljnaGrupa=?, cilj=?, opisProjekta=? WHERE id=?`,
      [data.naziv, data.formatiranNaziv, data.mjesto, data.pocetakImplementacije, data.krajImplementacije, data.nazivDonatora, data.projektniGrant, data.ciljnaGrupa, data.cilj, data.opisProjekta, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateNaslovnuSliku: (data, callBack) => {
    pool.query(`UPDATE projects SET naslovnaSlika=? WHERE id=?`, [data.naslovnaSlika, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  deleteProject: (id, callBack) => {
    pool.query(`DELETE FROM projects WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  getSelectedImage: (id, callBack) => {
    pool.query(`SELECT naslovnaSlika FROM projects WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
