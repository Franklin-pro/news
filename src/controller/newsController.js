import express from 'express'
import mongoose from 'mongoose'
import News from '../model/news'
import errorMessages from '../itills/errorMessages'
import successMessages from '../itills/successMessages'
import sendEmail from '../itills/email'

class newsController{
    static async newsletter(req,res){
        const{newsMainTIttle,newsTittle,newsDescription,newsImage,publisher}=req.body

        const news = await News.create({newsMainTIttle,newsTittle,newsDescription,newsImage,publisher})
        if(!news){
            return errorMessages(res,403,`news not posted`)
        }else{
            return successMessages(res,201,`news posted successfully`,news)
        }
    }
    static async getAllNews(req,res){
        const news =await News.find();
        try {
            if (!news) {
              return errorMessages(res, 401, `No news Found`);
            } else {
              return successMessages(res, 200, `News ${news.length} found`, news);
            }
          } catch (error) {
            return errorMessages(res, 404, error);
          }
        }
   
    static async deleteAllNews(req,res){
        const news = await News.deleteMany()
        if(!news){
            return errorMessages (res,404,`no news found`)
        }else{
            return successMessages(res,200,`all news deleted successfully`)
        }
    }
    static async updateNews(req, res) {
        const id= req.params.id;
        const news = await News.findByIdAndUpdate(id, req.body,{new:true});
        try {
          if (!news) {
            return errorMessages(res, 401, `news not updated`);
          } else {
          const users = await News.find();
          users.map((users)=>{
            sendEmail(users,news)
          })
          }
        } catch (error) {
            return errorMessages(res,404,error)
        }
      }
      static async getOneNews(req,res){
        const {id}=req.params;
        const news=await News.findOne({_id:id})
        try {
            if(!news){
                return errorMessages(res,401,`news with id ${id} not found`)
            }else{
                return successMessages(res,200,`news successfuly retrieved `,news)
            }
            
        } catch (error) {
            return errorMessages(res,404,error)
        }
      }
      static async deleteOneNews(req,res){
        const id=req.params.id
       const news=await News.findByIdAndDelete({_id:id})
       if(!news){
        return errorMessages(res,401,`news with id ${id} not found`)
       }else{
        return successMessages(res,200,`news successfuly deleted`)
       }
      }
      static async likes(req,res){
         const id = req.params.id
         const news = await News.findById(id)
         if(!news){
          return errorMessages (res,401,`no news found`)
         }else{
          news.likes +=1 
          await news.save()
          return successMessages(res,200,`your liked ${news.likes}`,news)
         }
         
        
      }

      static async unlikes(req,res){
        const id = req.params.id
        const news = await News.findById(id)
        if(!news){
         return errorMessages (res,401,`no news found`)
        }else{
         news.unlikes +=1 
         await news.save()
         return successMessages(res,200,`your unliked ${news.unlikes}`,news)
        }
        
       
     }
    }

export default newsController