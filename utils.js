const jwt = require('jsonwebtoken'),
      config = require('./config');

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
      const token = req.headers.authorization;
      const options = {
        expiresIn: '1d',
        issuer: 'https://example.com'
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, config.JWT_SECRET, options);

        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};