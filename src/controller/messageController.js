
import Message from '../model/message'
import errorMessages from '../itills/errorMessages'
import successMessages from '../itills/successMessages'
class messageController{
    static async createMessage(req,res){
        const {email,firstName,message}=req.body;
        const msg=await Message.create({email,firstName,message})
        if(!msg){
            return errorMessages(res,401,`message not sent`)
        }else{
            return successMessages(res,201,`message successfuly sent`,msg)
        }
    }
    static async getAllMessage(req,res){
        const msg = await Message.find();
        if(!msg || msg.length==0){
            return errorMessages(res,401,`no message found`)
        }else{
            return successMessages(res,200,`messages ${msg.length} successfully retrived`,msg)
        }
    }
    
    static async deleteAllMessage(req,res){
        const msg = await Message.deleteMany()
        if(!msg){
            errorMessages(res,401,`no message`)
        }
        else{
            successMessages(res,200,`message deleted`)
        }
    }
    
}

export default messageController