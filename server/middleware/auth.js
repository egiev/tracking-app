const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next();
};

module.exports = verifyToken;
