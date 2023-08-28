import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/index';
import bodyParser from 'body-parser';

const app= express();
dotenv.config()
app.use(bodyParser.json())
app.use("/api/v1",router)

const database=process.env.DATABASE
const port = process.env.PORT

//config port

app .listen(port,()=>{
    console.log(`port running on ${port}`)
})

mongoose.connect(database).then(()=>{
    console.log(`database successfully connected`)
}).catch((err)=>{
    console.log(`database error...${err}`)
})
export default app