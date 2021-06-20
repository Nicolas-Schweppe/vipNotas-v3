const notesController={};

const Note = require('../models/Notes');
const Categoria = require('../models/Categoria');
const User = require('../models/User');
const { compare } = require('bcryptjs');

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
   
    
    const categoria1 =await Categoria.findOne({"user":{$eq :req.user.id}});
                                                 //evita injecion de url y comprueba los parametros con la base
    const categoria2 =await Categoria.findOne({"_id":{$eq :req.params.id}});

    const validar=categoria1.user.equals(categoria2.user); 
    


    if(validar){
        const idCategoria = req.params.id;
        const notes = await Note.find({"categoria":{$eq :idCategoria},"user":{$eq:req.user.id}}).lean();
        console.log("aprobado");

    res.render('notes/allNotes',{notes,idCategoria});   
    }else{
         req.flash('error_msg','No autorizado');
        console.log("desaprobado");
        res.redirect('/categoria/');
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