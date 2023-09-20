import nodemailer from 'nodemailer'

const sendEmail=async(allUsersinfo,newsData)=>{
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user: process.env.EMAIL,
            pass:process.env.PASSWORD
        },
    });

     let mailOption={
        from:process.env.EMAIL,
        to:allUsersinfo.email,
        subject: `${allUsersinfo.firstName} new post has been added`,
        html: `<p>dear, <b>${allUsersinfo.firstName} ${allUsersinfo.lastName}</b></p><br><br>
         <p>new post <b>${newsData.newsMaintittle}</b></p><br><br>click the link <a href="#">kenzo</a>`
     }
     transporter.sendMail(mailOption,function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
     })

}
export default sendEmail