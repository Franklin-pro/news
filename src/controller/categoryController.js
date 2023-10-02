import express from 'express'
import Category from '../model/category'
import errorMessages from '../itills/errorMessages'
import successMessages from '../itills/successMessages'

class categoryController{
    static async createCategory(req,res){
        const {categoryName}=req.body
        const category = await Category.create({categoryName})
        if(!category){
            return errorMessages(res,201,`no category provided`)
        }else{
            return successMessages(res,200,`category added`,category)
        }
    }
}
export default categoryController