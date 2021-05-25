const categoriaController={};

const Categoria = require('../models/Categoria');

categoriaController.renderCategoriaForm = (req,res)=>{
    res.render('categoria/newCategoria');
};

categoriaController.createNewCategoria = async (req,res)=>{
    const {nombre,user}=req.body;
    const NewCategoria = new Categoria({nombre,user});
    NewCategoria.user = req.user.id ;
    await NewCategoria.save();
    
    
    req.flash('success_msg','Categoria agregada');
    res.redirect('/categoria');
    
}

categoriaController.renderCategoria =  async (req,res)=>{

   const categoria = await Categoria.find({user:req.user.id}).lean();
   res.render('categoria/allCategoria',{categoria});
   
}

categoriaController.renderEditFormCategoria = async (req,res)=>{
    const categoriaEditar = await Categoria.findById(req.params.id).lean();
    if(categoriaEditar.user != req.user.id){
        req.flash('error_msg','No autorizado');
        return res.redirect('/categoria'); 

    }
    
    res.render('categoria/editCategoria',{categoriaEditar});
}

categoriaController.updateCategoria = async (req,res)=>{
    const {nombre } = req.body;
    console.log(req.body);
    await Categoria.findByIdAndUpdate(req.params.id,{nombre});
    req.flash('success_msg','Categoria Actualizada');
    res.redirect('/categoria');
}

categoriaController.deleteCategoria = async (req,res)=>{

    const categoriaEliminar = await Categoria.findByIdAndDelete(req.params.id);  
        if(categoriaEliminar.user != req.user.id){
           req.flash('error_msg','No autorizado');
           res.redirect('/categoria');
        }
    req.flash('success_msg','Categoria Eliminada');
    res.redirect('/categoria');

}

module.exports = categoriaController;