const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
 firstName:{
     type: String,
     required: true
 },
 lastName:{
    type: String,
    required: true
},
email:{
    type:String,
    unique:true,
    required:true
},
recepies: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],

password:{
    type:String,
    rquired:true
},
createdDate:{
    type:Date,
    default:Date.now
}
})
module.exports=mongoose.model('User', userSchema)