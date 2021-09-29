const express = require('express');
const path = require('path')
const serveStatic = require('serve-static');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//initializations
const app = express();
require('./config/passport');



//setting

app.set('port',process.env.PORT || 8080 ,  function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });


app.set('views',path.join(__dirname ,'views')); //ruta de vistas
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views') ,'layouts'),
    partialsDir:path.join(app.get('views') ,'partials'),
    extname:'.hbs', //que estencion voy a usar
    runtimeOptions:{
        allowProtoPropertiesByDefault:true,
        allowProtoMethosdsByDefault:true
    }
}));
app.set('view engine','.hbs');
//middlewares
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error_msg = req.flash('errors');
    res.locals.error_msg = req.flash('advertencia');
    
    res.locals.user = req.user || null;
    next();
})
//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/categorias.routes'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;