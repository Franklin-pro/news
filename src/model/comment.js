import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
 user:[{
type: mongoose.Schema.Types.ObjectId,
ref:'User'
 }],
    comment:{
        type:String,
    },
    postedAt:{
        type:Date,
        default:Date.now()
    }
})
commentSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'firstName lastName email'
    })
    next()
})
const Comment = mongoose.model("Comment",commentSchema)

export default Comment