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

notesController.renderEditForm = async (req,res)=>{
    const notaEditar = await Note.findById(req.params.id).lean();
    console.log(notaEditar);
    res.render('notes/editNote',{notaEditar});
}

notesController.updateNote = async (req,res)=>{
    const {title, description } = req.body;
    console.log(req.body);
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    res.redirect('/notes');
}

notesController.deleteNote = async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
}

module.exports = notesController;