import express from "express";
import Comment from "../model/comment";
import User from "../model/user";
import News from "../model/news";
import errorMessages from "../itills/errorMessages";
import successMessages from "../itills/successMessages";
class commentController{
    static async createComment(req,res){
        
        const newsId = req.params.id
        const comment = await Comment.create(req.body)  
        const news = await News.findByIdAndUpdate({_id:newsId},{$push:{comment:comment}},{new:true})
        if(!news){
         return errorMessages (res,401,`no news founds`)
        }
        else{
            return successMessages(res,200,`comment posted`,news)
        }

    }
    static async getAllComment(req,res){
        const comment = await Comment.find();
        if(!comment){
return errorMessages(res,401,`no cap broo`)
        }else{
            successMessages(res,200,`all comment retreived`,comment)
        }
    }
}
export default commentController