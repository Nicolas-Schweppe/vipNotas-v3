const mongoose = require('mongoose');
const { use } = require('./routes/users.routes');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} =process.env; //traigo variables de env
const MONGODB_URI= `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;
const nueva='mongodb+srv://nicolas:FX8350amdr9280X_@cluster0.nzdq0.mongodb.net/notes-app?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
})
    .then(db=>console.log('DataBase conectada!!!!'))
    .catch(err => console.log(err));