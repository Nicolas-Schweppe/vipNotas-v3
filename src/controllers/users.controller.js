const User = require("../models/User");
const Categoria = require("../models/Categoria");
const usersController={}
const passport = require('passport');



usersController.renderFormRegistro= (req,res)=>{
    res.render('users/formRegistro');
}

usersController.registrar= async(req,res) => {
    
    const errors = [];
    const {nombre,email,password,confirmar_password } = req.body;
    if(password != confirmar_password){
        errors.push({text: 'Contraseña no coinciden'});
    }if(password.length < 7 ){
        errors.push({text:'Se solicita que la contraseña tenga mas de 7 caracteres'});
    }if(errors.length > 0){
        res.render('users/formRegistro',{
            errors,
            nombre,
            email
        })
    }else{
        const emailUsers = await User.findOne({email:email});
        if(emailUsers){
            req.flash('errors','El correo ya esta registrado');
            res.redirect('/users/formRegistro');
        }else{
            const newUsers =new User({nombre,email,password});
            newUsers.password = await newUsers.encryptPassword(password);
            await newUsers.save();
            const usuarioNuevo= await User.findOne({email:email});
            const usuario1=usuarioNuevo.id;
            
            const nombreC ="Vip";  // se crea una categoria para evitar error al validar
            
            const NewCategoria = Categoria({nombre:nombreC,user:usuario1});
            NewCategoria.user = usuarioNuevo.id ;
            console.log("usuario id :"+usuarioNuevo.id);
            await NewCategoria.save();
            
            req.flash('success_msg','Usuario creado');
            res.redirect('/users/inicio');
        }
    }
}

usersController.formInicio=(req,res)=>{
    res.render('users/formInicio');
}

usersController.inicio = passport.authenticate('local',{
    failureRedirect: 'inicio',
    successRedirect:'/',
    failureFlash: true

});

usersController.rendenFormActualizar = async (req, res)=>{
   
    const userEditar = await User.findOne({_id:req.user.id}).lean();
    res.render('users/formActualizar',{userEditar});
    
}

usersController.actualizar=async(req,res)=>{
    const {id,email,password,newPassword,confirmar_newPassword}=req.body;
    const usuarioEditar = await User.findOne({_id:req.user.id});

    let contraseñaOriginal = usuarioEditar.password;
    let contraseñaAnterior = await usuarioEditar.matchPassword(password);

    const nuevaContraseña= await usuarioEditar.encryptPassword(newPassword);


    if(contraseñaAnterior){
        
        await User.updateOne({_id: req.user.id},{$set:{password:nuevaContraseña}});
        console.log(contraseñaOriginal + ' == '+ contraseñaAnterior);
        req.flash('success_msg','Usuario Actualizado');
        res.redirect('/users/inicio');
        
    }else{
        console.log(contraseñaOriginal + ' == '+contraseñaAnterior);
        console.log('nueva clave '+ confirmar_newPassword);
        req.flash('error_msg','Contraseña incorrecta');
            res.redirect('/users/inicio');
            
    }

}    

usersController.salir =(req,res)=>{
    req.logout();
    req.flash('success_msg','Sesion cerrada');
    res.redirect('/users/inicio');
}

module.exports = usersController;