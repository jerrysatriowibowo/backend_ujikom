const router = require('express').Router();
const categoriController = require("../controllers/categoriController");

router.post('/api/v1/categori', categoriController.create);
router.get('/api/v1/categori', categoriController.findAll);
router.put('/api/v1/categori/:id', categoriController.update);
router.delete('/api/v1/categori/:id', categoriController.delete);
router.get('/api/v1/categori/:id', categoriController.findOne);

module.exports = router;