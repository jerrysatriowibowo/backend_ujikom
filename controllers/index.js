const authController = require('./authController');
const userController = require('./userController');
const comentController = require('./comentController');

module.exports = {
    auth: authController,
    user: userController,
    coment: comentController,
}