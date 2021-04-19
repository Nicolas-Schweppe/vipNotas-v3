const notesController={};

const Note = require('../models/Notes');

notesController.renderNoteForm = (req,res)=>{
    res.render('notes/newNote');
};

notesController.createNewNote = async (req,res)=>{
    const {title, description}=req.body;
    const NewNote = new Note({title,description});
    await NewNote.save();
    res.redirect('/notes');
    
}

notesController.renderNotes =  async (req,res)=>{
   const notes = await Note.find({}).lean();
   res.render('notes/allNotes',{notes});
}

notesController.renderEditForm = (req,res)=>{
    res.send('editando form');
}

notesController.updateNote = (req,res)=>{
    res.send('nota editada');
}

notesController.deleteNote = async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
}

module.exports = notesController;