const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO offers(naziv, formatiranNaziv, opis, sadrzajPonude, trener, pocetakPonude, krajPonude, cijena, uzrast, napomene, tipPonude, tipPrijave, naslovnaSlika) 
        values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [data.naziv, data.formatiranNaziv, data.opis, data.sadrzajPonude, data.trener, data.pocetakPonude, data.krajPonude, data.cijena, data.uzrast, data.napomene, data.tipPonude, data.tipPrijave, data.naslovnaSlika],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getOffers: (callBack) => {
    pool.query(`SELECT * FROM offers`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getOfferByName: (name, callBack) => {
    pool.query(`SELECT * FROM offers WHERE formatiranNaziv = ?`, [name], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  updateOffer: (data, callBack) => {
    pool.query(
      `UPDATE offers SET naziv=?, formatiranNaziv=?, opis=?, sadrzajPonude=?, trener=?, pocetakPonude=?, krajPonude=?, cijena=?, uzrast=?, napomene=?, tipPonude=?, tipPrijave=? WHERE id=?`,
      [data.naziv, data.formatiranNaziv, data.opis, data.sadrzajPonude, data.trener, data.pocetakPonude, data.krajPonude, data.cijena, data.uzrast, data.napomene, data.tipPonude, data.tipPrijave, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateNaslovnuSliku: (data, callBack) => {
    pool.query(`UPDATE offers SET naslovnaSlika=? WHERE id=?`, [data.naslovnaSlika, data.id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  deleteOffer: (id, callBack) => {
    pool.query(`DELETE FROM offers WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  getSelectedImage: (id, callBack) => {
    pool.query(`SELECT naslovnaSlika FROM offers WHERE id=?`, [id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
