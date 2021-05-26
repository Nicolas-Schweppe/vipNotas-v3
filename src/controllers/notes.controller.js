const notesController={};

const Note = require('../models/Notes');

notesController.renderNoteForm = (req,res)=>{
    res.render('notes/newNote');
};

notesController.createNewNote = async (req,res)=>{
    const {title, description}=req.body;
    const NewNote = new Note({title,description});
    NewNote.user = req.user.id ;
    NewNote.categoria='60ae6247a39bf503fdbedb64';
    console.log(NewNote.categoria+" esto es el id de la categoreia");
    await NewNote.save();
    
    
    req.flash('success_msg','Nota agregada');
    res.redirect('/notes');
    
}

notesController.renderNotes =  async (req,res)=>{

   const notes = await Note.find({categoria:req.params.id}).lean();
   res.render('notes/allNotes',{notes});
}

notesController.renderEditForm = async (req,res)=>{
    const notaEditar = await Note.findById(req.params.id).lean();
    if(notaEditar.user != req.user.id){
        req.flash('error_msg','No autorizado');
        return res.redirect('/notes'); 

    }
    console.log(notaEditar);
    res.render('notes/editNote',{notaEditar});
}

notesController.updateNote = async (req,res)=>{
    const {title, description } = req.body;
    console.log(req.body);
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg','Nota Actualizada');
    res.redirect('/notes');
}

notesController.deleteNote = async (req,res)=>{

    const notaEliminar = await Note.findByIdAndDelete(req.params.id);  
        if(notaEliminar.user != req.user.id){
           req.flash('error_msg','No autorizado');
           res.redirect('/notes');
        }
    req.flash('success_msg','Nota Eliminada');
    res.redirect('/notes');

}

module.exports = notesController;