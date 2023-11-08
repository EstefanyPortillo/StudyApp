const { sequelize } = require("../connection"); 
const jwt = require("jsonwebtoken");

const auth = async function (req, res, next) {
  if (!req.headers.authorization) {
    res.json({
      success: false,
      error: "No authorization header",
    });
    return;
  } else {
    let token = req.headers.authorization;

    const userDB = await sequelize.query(
      "SELECT * FROM users WHERE token = '" + token + "'"
    );
    let user = null;

    if (userDB.length > 0 && userDB[0].length > 0) {
      user = userDB[0][0];

      console.log("Token del usuario: ", user);

      res.locals.userId = user.id;

      next(); 
    } else {
      res.json({
        success: false,
        error: "Token inválido",
      });
    }
  }
};

module.exports = {
  auth,
};