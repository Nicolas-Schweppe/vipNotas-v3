const notesController={};

notesController.renderNoteForm = (req,res)=>{
    res.render('notes/newNote');
};

notesController.createNewNote = (req,res)=>{

    res.send('creando nota');
    console.log(req.body);
}

notesController.renderNotes = (req,res)=>{
    res.send('todas las notas');
}

notesController.renderEditForm = (req,res)=>{
    res.send('editando form');
}

notesController.updateNote = (req,res)=>{
    res.send('nota editada');
}

notesController.deleteNote = (req,res)=>{
    res.send('nota eliminada');
}

module.exports = notesController;