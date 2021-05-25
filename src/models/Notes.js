const {Schema , model } = require('mongoose');

const NoteSchema = new Schema({
    title:{type: String,required:true},
    description:{type: String,required:true},
    categoria:{type: Schema.Types.ObjectId,
        ref:'Categoria'},
    user:{type:String,required:true},
},{
    timestamps:true
});

module.exports= model('Note',NoteSchema);