const {Router}= require('express');
const router = Router();
const  {isAuthenticated} = require('../helpers/validar');

const { renderNoteForm ,
    createNewNote ,
    renderNotes ,
    renderEditForm ,
    updateNote ,
    deleteNote 
    } = require('../controllers/notes.controller');

//nueva nota
router.get('/notes/add/:id',isAuthenticated,renderNoteForm);

router.post('/notes/newNote/:id',isAuthenticated,createNewNote,renderNotes);

//todas las notas
router.get('/notes/:id',isAuthenticated,renderNotes);

//editar notas 
router.get('/notes/editNote/:id',isAuthenticated,renderEditForm);

router.put('/notes/editNote/:id',isAuthenticated,updateNote);

//borrar 
router.delete('/notes/delete/:id',isAuthenticated,deleteNote);


module.exports = router;