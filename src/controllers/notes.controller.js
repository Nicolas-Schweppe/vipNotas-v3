const notesController={};

const Note = require('../models/Notes');

notesController.renderNoteForm = (req,res)=>{
    res.render('notes/newNote');
};

notesController.createNewNote = async (req,res)=>{
    const {title, description}=req.body;
    const NewNote = new Note({title,description});
    console.log(NewNote);
    await NewNote.save();
    
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

notesController.deleteNote = (req,res)=>{
    res.send('nota eliminada');
}

module.exports = notesController;