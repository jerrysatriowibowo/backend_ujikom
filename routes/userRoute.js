const router = require('express').Router();
const userController = require("../controllers/userController");
const { verifyToken } = require('../middleware/auth');

router.post('/api/v1/user', verifyToken, userController.create);
router.get('/api/v1/user', verifyToken, userController.findAll);
router.put('/api/v1/user/:id', verifyToken, userController.update);
router.delete('/api/v1/user/:id', verifyToken, userController.delete);
router.get('/api/v1/user/:id', verifyToken, userController.findOne);
router.put('/api/v1/user/data/:id', verifyToken, userController.editUser);
router.put('/api/v1/user/password/:id', verifyToken, userController.editPassword);

module.exports = router;