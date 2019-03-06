const db = require('./../models/db'),
      bcrypt = require('bcrypt'),
      saltRounds = 10;

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
      console.log('err', err);
      console.log('hash', hash);
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
          // console.log('user created', created);
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
  }
}