// hano hanjya logic zose

import express from 'express'
import User from '../model/user';
import successMessages from '../itills/successMessages';
import errorMessages from '../itills/errorMessages';
import bcrypt, { compare } from 'bcrypt'
import jwt from "jsonwebtoken";
class userContorller{
    static async createUser(req,res){
        const {firstName,lastName,email,password,role}=req.body
       try{
        if(req.body.password!== req.body.confirmPassword){
            return errorMessages(res,403,'password and confirmPassword not match')
            // return res.status(403).json({
            //     message:"password and confirm password not match"
            // })
        }
        const hashPassword=bcrypt.hashSync(req.body.password,10)
       

        const users = await User.create({firstName,lastName,email,password:hashPassword,role});

        return successMessages(res,201,`user created`,users)
   
       } catch(error){
      
            // return errorMessages(res,403,error)
        
       }
    }
    static async getAllUsers(req,res){
        const users = await User.find();
        if(!users || users.length==0){
            return errorMessages(res,401,'no user found')
            // return res.status(401).json({
            //     message:'no user found'
            // })
        }else if(users){
            return successMessages(res,201,`all ${users.length} found`,users)
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
    static async deleteOneUser(req,res){
        const id=req.params.id
        const user= await User.findByIdAndDelete(id)
        if(!user){
          errorMessages(res,401,`user with id ${id} not found`)
        }else{
          successMessages(res,200,`user successfuly deleted`)
        }
      }
      static async userUpdate(req,res){
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id,req.body,{new:true})
        if(!user){
            return errorMessages(res,401,`user not found`)
        }else{
            return successMessages(res,200,`user update successfully`,user)
        }
      }
      static async login(req,res){
        const{email,password}=req.body
        const user = await User.findOne({email})
        if(!user){
            return errorMessages(res,401,`invalid email or password`)
        }else{
            const comparePassword =bcrypt.compareSync(password,user.password)

            if(!comparePassword){
                return errorMessages(res,401,`invalid email or password`)
            }else{
                const token = jwt.sign({user:user},process.env.SECRET_KEY,{expiresIn:"1d"})
            return res.status(200).json({
                token:token,
                data:{
                    user:user
                }
            })
            }
        }
      }
}

export default userContorller