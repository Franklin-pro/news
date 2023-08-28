// hano hanjya logic zose

import express from 'express'
import User from '../model/user';
import successMessages from '../itills/successMessages';
import errorMessages from '../itills/errorMessages';
import bcrypt from 'bcrypt'

class userContorller{
    static async createUser(req,res){
        const {firstName,lastName,email,password}=req.body
       try{
        if(req.body.password!== req.body.confirmPassword){
            return res.status(403).json({
                message:"password and confirm password not match"
            })
        }
        const hashPassword=bcrypt.hashSync(req.body.password,10)
       

        const user = await User.create({firstName,lastName,email,password:hashPassword});

        return successMessages(res,201,`user created`,user)
   
       } catch(error){
        if(error.code == 11000){
            return errorMessages(res,403,'user already exist')
            // return res.status(403).json({
            //     message:`user already exist`
            // })
        }else{
            return res.status(500).json({
                message:error
            })
        }
       }
    }
    static async getAllUsers(req,res){
        const user = await User.find();
        if(!User || User.length==0){
            return errorMessages(res,401,'no user found')
            // return res.status(401).json({
            //     message:'no user found'
            // })
        }else if(User){
            return successMessages(res,201,`all ${user.length} found`,user)
        }
    }
    static async deleteAllUsers(req,res){
        
        const users = await User.deleteMany();
        return successMessages(res,200,'all users deleted',users)
        // return res.status(400).json({
        //     message:'all users deleted',
        //     data:users
        // })
    }

    static async getOneuser(req,res){
        const id = req.params.id
        const user = await User.findById(id)

        if(!user){
            return errorMessages(res,201,`no user found with that ${id}`)
        }else{
            return successMessages(res,200,`user successfully retrives`,user)
        }
    }
}

export default userContorller