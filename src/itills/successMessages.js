const successMessages = (res,status,message,token,data)=>{
    res.status(status).json({
        message:message,
        data:data,
        token:token
        
    })
}

export default successMessages