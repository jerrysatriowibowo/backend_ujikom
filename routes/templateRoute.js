const router = require('express').Router();
const templateController = require("../controllers/templateController");
const { verifyToken } = require('../middleware/auth');

router.post('/api/v1/template', verifyToken, templateController.create);
router.get('/api/v1/template', templateController.findAll);
router.put('/api/v1/template/:id', verifyToken, templateController.update);
router.delete('/api/v1/template/:id', verifyToken, templateController.delete);
router.get('/api/v1/template/:id', templateController.findOne);
router.get('/api/v1/template/categori/:id', templateController.findByCategori);
router.get('/api/v1/template/total', templateController.totalTemplate);

module.exports = router;