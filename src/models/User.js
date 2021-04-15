const {Schema,model} = require('mongoose');
const bcrypt =require('bcryptjs');

const UserSchema = new Schema({
    name:{ type: String , required:true },
    email:{type : String,required:true},
    password:{type:String , required:true},

},{timestamps:true});

///cifrar la contraseña 
UserSchema.methods.encrypPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};
///compara las contraseñas
UserSchema.methods.matchPassword = function (password) {
   await bcrypt.compare(password,this.password)
}

module.exports = model('User',UserSchema);
