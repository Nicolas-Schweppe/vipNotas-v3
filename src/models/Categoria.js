const {Schema , model } = require('mongoose');


const CategoriaSchema = new Schema({
    nombre:{type: String,required:true},
    notas:[{type: Schema.Types.ObjectId,
          ref:'Notes'}],
    user:{type: Schema.Types.ObjectId,
          ref:'User'}
},{
    timestamps:true
});

module.exports= model('Categoria',CategoriaSchema);