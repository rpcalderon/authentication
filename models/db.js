const Sequelize = require('sequelize'),
      config = require('./../config.js');

const sequelize = new Sequelize(
  config.databaseName,
  config.databaseUser,
  config.databasePassword,
  {
    host: config.hostURL,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/* Auto Generate MySQL Models*/
// var SequelizeAuto = require('sequelize-auto');
// var auto = new SequelizeAuto(config.databaseName,
//   config.databaseUser,
//   config.databasePassword, {
//   host: config.hostURL,
//   dialect:  'mysql',
//   additional: {
//     timestamps: false
//   }
// })

// auto.run(function (err) {
//   if (err) throw err;

//   // console.log(auto.tables); // table list
//   // console.log(auto.foreignKeys); // foreign key list
// });

const user = sequelize.import(__dirname + '/User');

module.exports.user = user;