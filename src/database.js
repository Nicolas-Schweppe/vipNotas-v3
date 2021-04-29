const mongoose = require('mongoose');
const { use } = require('./routes/users.routes');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} =process.env; //traigo variables de env
const MONGODB_URI= `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;


mongoose.connect(MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
})
    .then(db=>console.log('DataBase conectada!!!!'))
    .catch(err => console.log(err));