import jwt  from "jsonwebtoken"
import errorMessages from "../itills/errorMessages";

const verifyAccess=(passrole)=>{
return(req,res,next)=>{
    const token = req.headers["auth-token"];
    if(!token){
        return errorMessages(res,401,`no token provided`)
    }
    else{
        try{
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY,{expiresIn:"1d"})
        req.user=verifyToken.user;
        if(passrole!==verifyToken.user.role){
        return errorMessages(res,401,`you don't have access`)
        }else{
            return next()
        }
    }catch(error){
        if(error.name=="JsonWebTokenError"){
            return errorMessages(res,401,`invalid token or expired token`)
        }
    }

}
}
}

export default verifyAccess