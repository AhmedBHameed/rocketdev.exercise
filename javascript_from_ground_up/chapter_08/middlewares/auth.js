const {decodeJWT} = require('../services/jwt');

function authMiddleware() {
  return function (req, res, next) {
    try {
      const {ACCESS_TOKEN} = req.cookies;
      const userData = decodeJWT(ACCESS_TOKEN);
      console.log('🚀 ~ file: auth.js ~ line 8 ~ userData', userData);
      req.auth = {
        error: null,
        user: userData,
      };
    } catch (error) {
      req.auth = {
        error: error.message,
        user: null,
      };
    }
    next();
  };
}

module.exports = authMiddleware;
