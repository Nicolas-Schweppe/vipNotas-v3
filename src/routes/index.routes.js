const { Router } = require('express');
const router = Router();
const {renderAbaut, renderIndex }=require('../controllers/index.controller')

router.get('/',renderIndex);

router.get('/abaut',renderAbaut);

module.exports = router;