const usersController={}


usersController.renderFormRegistro= (req,res)=>{
    res.render('users/formRegistro');
}

usersController.registrar=(req,res) => {
    res.send('registrado');
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