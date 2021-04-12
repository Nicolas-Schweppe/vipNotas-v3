const express = require('express');
const path = require('path')
//initializations
const app = express();

//setting
app.set('port',process.env.PORT || 4000 );
app.set('views',path.join(__dirname ,'views')); //ruta de vistas
//middlewares
app.use(express.urlencoded({extended:false}));
//global variables

//Routes
app.get('/',(req,res)=>{
    res.send('holiis');
})
//Static files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;