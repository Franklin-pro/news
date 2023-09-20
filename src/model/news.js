import mongoose from "mongoose";

const newsSchemas = new mongoose.Schema({
  newsMainTIttle: {
    type: String,
  },
  newsTittle: {
    type: String,
  },
  newsDescription: {
    type: String,
  },
  newsImage: {
    type: String,
  },
  publisher: {
    type: String,
  },
  comment:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }],
  likes:{
    type:Number,
    default:0
  },
  unlikes:{
    type:Number,
    default:0
  },
  postedAt: {
    type:Date,
    default:Date.now()
  },
});
newsSchemas.pre(/^find/,function(next){
  this.populate({
    path:'comment',
    select:'comment postedAt'
  })
  next()
})

const News = mongoose.model("News",newsSchemas)

export default News