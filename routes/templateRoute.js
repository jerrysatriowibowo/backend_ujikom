const router = require('express').Router();
const templateController = require("../controllers/templateController");
const { verifyToken } = require('../middleware/auth');

router.post('/api/v1/template', verifyToken, templateController.create);
router.get('/api/v1/template', verifyToken, templateController.findAll);
router.put('/api/v1/template/:id', verifyToken, templateController.update);
router.delete('/api/v1/template/:id', verifyToken, templateController.delete);
router.get('/api/v1/template/:id', verifyToken, templateController.findOne);
router.get('/api/v1/template/total', verifyToken, templateController.totalTemplate);

module.exports = router;