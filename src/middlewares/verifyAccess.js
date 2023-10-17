import jwt  from "jsonwebtoken"
import errorMessages from "../itills/errorMessages";

const verifyAccess=(passrole)=>{
return(req,res,next)=>{
    const token = req.headers["auth-token"];
  
    if(!token){
        return errorMessages(res,401,`no token provided`)
    }
  else{
   
    try {
      
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY,{expiresIn:"1d"})
        const user=verifyToken.user
        if(user.role!==passrole){
            return errorMessages(res,401,`you don't have access`)
           
        }
       return next()
        
        
    } catch (error) {
                if(error.name=="JsonWebTokenError"){
            return errorMessages(res,401,`invalid token `)
        }else if(error.message=="jwt expired"){
            return errorMessages(res,401,`token expired`)
        }
        else{
            return errorMessages(res,401,error)
        }
    }
  }



}
}

export default verifyAccess