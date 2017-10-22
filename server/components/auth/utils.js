const bcrypt = require('bcryptjs');

module.exports = (userPassword, dbPassword) => bcrypt.compareSync(userPassword, dbPassword);