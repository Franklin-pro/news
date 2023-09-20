import mongoose from "mongoose";

const messageSchemas = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
//     date:{
// date:Date,
// default:Date.now()
//     }
    
})
const Message = mongoose.model("Message",messageSchemas)
export default Message