const {Router} = require('express');
const router = Router();

const {renderFormRegistro,
    registrar,
    formInicio,
    inicio,
    salir}
    =require('../controllers/users.controller');


router.get('/users/formRegistro',renderFormRegistro);

router.post('/users/registrar',registrar);

router.get('/users/inicio',formInicio);

router.post('/users/inicio',inicio);

router.get('/users/salir',salir);


module.exports = router; 