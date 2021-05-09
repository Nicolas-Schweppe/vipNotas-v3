const helpers = {};

helpers.isAuthenticated =(req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('errors','No tiene permisos. Regístrate');
        res.redirect('/users/inicio');
    }
}

module.exports = helpers; 