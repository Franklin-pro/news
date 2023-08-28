const errorMessages = (res,status,message)=>{
res.status(status).json({
    message:message
})
}

export default errorMessages