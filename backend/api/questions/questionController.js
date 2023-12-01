const { create, getQuestions, deleteQuestion } = require("./questionService");

module.exports = {
  createQuestion: (req, res) => {
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

  getQuestions: (req, res) => {
    getQuestions((err, results) => {
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

  deleteQuestion: (req, res) => {
    const data = req.params.id;
    deleteQuestion(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Upit nije pronađen",
        });
      }
      return res.json({
        success: 1,
        message: "Upit uspješno obrisan",
      });
    });
  },
};
