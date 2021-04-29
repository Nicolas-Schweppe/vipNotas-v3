const User = require("../models/User");

const usersController={}


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
            req.flash('error_msg','El correo ya esta registrado');
            res.redirect('/users/formRegistro');
        }else{
            const newUsers =new User({nombre,email,password});
            newUsers.password = await newUsers.encryptPassword(password);
            await newUsers.save();
            req.flash('success_msg','Usuario creado');
            res.redirect('/users/formRegistro');
        }
    }
}

usersController.formInicio=(req,res)=>{
    res.render('users/formInicio');
}

usersController.inicio = (req,res)=>{
    
}

usersController.salir=(req,res)=>{
    res.send('saliendo');
}

module.exports = usersController;