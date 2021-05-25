const {Router}= require('express');
const router = Router();
const  {isAuthenticated} = require('../helpers/validar');

const { renderCategoriaForm ,
    createNewCategoria ,
    renderCategoria ,
    renderEditFormCategoria ,
    updateCategoria ,
    deleteCategoria 
    } = require('../controllers/categoria.controller');

//nueva nota
router.get('/categoria/add',isAuthenticated,renderCategoriaForm);

router.post('/categoria/newCategoria',isAuthenticated,createNewCategoria);

//todas las notas
router.get('/categoria',isAuthenticated,renderCategoria);

//editar notas 
router.get('/categoria/editCategoria/:id',isAuthenticated,renderEditFormCategoria);

router.put('/categoria/editCategoria/:id',isAuthenticated,updateCategoria);

//borrar 
router.delete('/categoria/delete/:id',isAuthenticated,deleteCategoria);


module.exports = router;