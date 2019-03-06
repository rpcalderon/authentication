const db = require('./../models/db'),
      config = require('./../config'),
      bcrypt = require('bcrypt'),
      saltRounds = 10,
      jwt = require('jsonwebtoken');

module.exports = {
  register: (req, res) => {
    console.log('hi', req.body);
    let result = {};
    let status = 200;

    let userFirstName = req.body.userFirstName,
        userLastName = req.body.userLastName,
        userEmail = req.body.userEmail,
        userPassword = req.body.userPassword;

    bcrypt.hash(userPassword, saltRounds, function (err, hash) {
      db.user.findOrCreate(
        {
          where: { userEmail: userEmail },
          defaults: {
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            userPassword: hash
          }
        }).spread((user, created) => {
          if (created) {
            result.status = status;
            result.result = user.get({ plain: true });
          } else {
            status = 202;
            result.status = status;
            result.error = 'User already exists!';
          }
          res.status(status).send(result);
        })
      });
  },

  login: (req, res) => {
    const userEmail = req.body.userEmail,
          userPassword = req.body.userPassword;

    db.user.findOne({ where: {userEmail: userEmail} }).then(user => {
      let result = {};
      let status = 200;

      if (user) {
        const varUserPassword = user.get({ plain: true }).userPassword;

        bcrypt.compare(userPassword, varUserPassword).then(match => {
          if (match) {
            status = 200;
            // Create a token
            const payload = user.get({ plain: true });
            const options = { expiresIn: '1d', issuer: 'https://example.com' };
            const secret = config.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);
            result.token = token;
            result.status = status;
            result.result = user.get({ plain: true });
          } else {
            status = 201;
            result.status = status;
            result.error = 'Password is invalid';
          }
          res.status(status).send(result);
        }).catch(err => {
          status = 201;
          result.status = status;
          result.error = 'Error';
          res.status(status).send(result);
        });
      } else {
        status = 201;
        result.status = status;
        result.error = 'User Not Found';
        res.status(status).send(result);
      }
    });
  }
}