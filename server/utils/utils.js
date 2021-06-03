const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// 解析token
exports.checkToken = async tokenkey=>{
    const setTokenKey = process.env.JWT_SECRET_KEY;
    const result = await jwt.verify(tokenkey,setTokenKey);
    return result
}

// //获取用户IP
exports.getUserIp = req =>{
    let ip = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    ip = ip.match(/\d+.\d+.\d+.\d+/);
    ip = ip ? ip.join('.') : 'No IP';
    return ip;
};


exports.main = async (email,src,text,name)=> {
  let transporter = await nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.email_username,
      pass: process.env.email_password, 
    },
  });
  let mailopitons = {
    from: process.env.email_username,
    to: email, 
    subject: "从渔夫yufu博客收到新消息", 
    html: `
        <div style='
            background-color: #000;
            color: #fff;
            padding: 20px;
        '>
            <a href="${process.env.http_url + src}" target="_blank" rel="noopener noreferrer">${name}</a>
            回复你
            <p>${text}</p>
        </div>
    `, 
  }
  await transporter.sendMail(mailopitons,(err,data)=>{
      if(err){
          console.log(err)
      }else{
          console.log('邮件发送成功')
      }
  });
}