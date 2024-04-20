const authController = require('./authController');
const userController = require('./userController');
const comentController = require('./comentController');
const templateController = require('./templateController');

module.exports = {
    auth: authController,
    user: userController,
    coment: comentController,
    template: templateController,
}