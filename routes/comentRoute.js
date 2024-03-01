const router = require('express').Router();
const comentController = require("../controllers/comentController");

router.post('/api/v1/coment', comentController.create);
router.get('/api/v1/coment', comentController.findAll);
router.put('/api/v1/coment/:id', comentController.update);
router.delete('/api/v1/coment/:id', comentController.delete);
router.get('/api/v1/coment/:id', comentController.findOne);

module.exports = router;