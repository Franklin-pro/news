import express from 'express';
import errorMessages from '../itills/errorMessages';
import User from '../model/user';

class dataChequer{
    static async userRegisterIsEmpty(req,res,next){
const {firstName,lastName,email,password,message}=req.body
if(firstName ==""){
    return errorMessages(res,401,`plz check your firstName field is required`)
}else if(lastName==""){
    return errorMessages(res,401,`plz check your lastName field is required`)
}
else if(email==""){
    return errorMessages(res,401,`plz check your email field is required`)
}
else if(password==""){
    return errorMessages(res,401,`plz check your password field is required`)
}
else if(message==""){
    return errorMessages(res,401,`plz check your message field is required`)
}
else{
    return next()
}
    };
    static async emailExist(req,res,next){
        const email = req.body.email;
        const user =await User.findOne({ email });
        if(user){
            return errorMessages(res,401,`email exist`)
        }else{
            return next()
        }
    }
}

export default dataChequer