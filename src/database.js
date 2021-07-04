/*const mongoose = require('mongoose');
const { use } = require('./routes/users.routes');
//const NUEVA='mongodb+srv://nicolas:FX8350amdr9280X_@cluster0.nzdq0.mongodb.net/notes-app?retryWrites=true&w=majority';

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} =process.env; //traigo variables de env
const MONGODB_URI= `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
})
    .then(db=>console.log('DataBase conectada!!!!'))
    .catch(err => console.log(err));
    
   */
   
    const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://nicolas:FX8350amdr9280X_@cluster0.nzdq0.mongodb.net/notes-app?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("notes-app").collection("devices");
  // perform actions on the collection object
  client.close();
}); 