const {Schema , model } = require('mongoose');

const NoteSchema = new Schema({
    title:{type: String,required:true},
    description:{type: String,required:true},
    categoria: String,
},{
    timestamps:true
});

module.export = model('Note',NoteSchema);