const controller = require('../controllers/user');
const validateToken = require('./../utils').validateToken;

module.exports = (router) => {
  router.route('/register')
    .post(controller.register);

  router.route('/login')
    .post(controller.login);

  router.route('/user/:userId')
    .get(validateToken, controller.getOne)
    .put(validateToken, controller.edit);
}