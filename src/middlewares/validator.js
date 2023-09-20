import { check,validationResult } from "express-validator";
import errorMessages from "../itills/errorMessages";

class validator{
    static inputValidator(req,res,next){
        const error = validationResult(req)
        if(!error==error.isEmpty()){
            error.errors.map((error)=>{

                return errorMessages(res,401,error.msg)
            })
        }else{
            return next()
        }
    }
    static userAccount(){
return[
    check("firstName","plz write your firstname").trim().isAlpha(),
    check("lastName","plz write your lastname ").trim().isAlpha(),
    check("email","plz write your email correctly ").trim().isEmail(),
    check("password","plz write strongPassword using upperCase(A),symbols(!@$%#..)and number(123...").trim().isStrongPassword(),
]
    }
}
export default validator