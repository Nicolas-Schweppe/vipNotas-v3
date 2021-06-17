const notesController={};

const Note = require('../models/Notes');
const Categoria = require('../models/Categoria');

notesController.renderNoteForm = (req,res)=>{
    const idCategoria = req.params.id;
    res.render('notes/newNote',{idCategoria});
};

notesController.createNewNote = async (req,res)=>{
    const {title, description}=req.body;
    const NewNote = new Note({title,description});
    NewNote.user = req.user.id ;
    NewNote.categoria=req.params.id;
    await NewNote.save();
    const idCategoria = req.params.id;
    
    req.flash('success_msg','Nota agregada');
   

        const notes = await Note.find({categoria:req.params.id}).lean();
        //const idCategoria = req.params.id;
        
        res.render('notes/allNotes',{notes,idCategoria});
     
}

notesController.renderNotes =  async (req,res)=>{
    const idCategoria = req.params.id;
    const usuario1 = req.user.id;
   
    const notes = await Note.find({user:req.user.id,categoria:idCategoria}).lean();
    const contenido = Object.entries(notes).length === 0; //ver si el objeto esta vacio. evita inj en url
        if(contenido){
            req.flash('error_msg','No autorizado');
            res.redirect('/categoria/');
       }else{
            res.render('notes/allNotes',{notes,idCategoria});
       }
       
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
    res.redirect('/categoria/');
}

notesController.deleteNote = async (req,res)=>{

    const notaEliminar = await Note.findByIdAndDelete(req.params.id);  
        if(notaEliminar.user != req.user.id){
           req.flash('error_msg','No autorizado');
           res.redirect('/notes/allNotes');
        }
    req.flash('success_msg','Nota Eliminada');
    res.redirect('/categoria/');

}

module.exports = notesController;