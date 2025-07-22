const mongoose = require('mongoose')
let emailPostSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:'user'},
    name:String,
    Mailcontent:String
},{timestamps:true})

let post = mongoose.model('Mailpost',emailPostSchema)
module.exports = post