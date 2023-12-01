const { create, getUserByName, getUsers } = require("./userService");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    body.password = "123";
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

  getUserByName: (req, res) => {
    const name = req.params.name;
    getUserByName(name, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Traženi korisnik nije pronađen",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
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
};
