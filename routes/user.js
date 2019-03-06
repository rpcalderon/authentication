const controller = require('../controllers/user');

module.exports = (router) => {
  router.route('/register')
    .post(controller.register);

  router.route('/login')
    .post(controller.login);
}