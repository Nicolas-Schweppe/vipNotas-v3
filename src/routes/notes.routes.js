const {Router}= require('express');
const router = Router();

const { renderNoteForm ,
    createNewNote ,
    renderNotes ,
    renderEditForm ,
    updateNote ,
    deleteNote 
    } = require('../controllers/notes.controller');

//nueva nota
router.get('/notes/add',renderNoteForm);

router.post('/notes/newNote',createNewNote);

//todas las notas
router.get('/notes',renderNotes);

//editar notas 
router.get('/notes/edit/:id',renderEditForm);

router.put('/notes/edit/:id',updateNote);

//borrar 
router.delete('/notes/delete/:id',deleteNote);


module.exports = router;