import nodemailer from "nodemailer";
export const sendEmail = async({to , subject ,text ,html})=>{
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  service: "gmail",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD ,
  },
});


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'mohamedalmahdy02@gmail.com', 
    to, 
    subject, 
    text, 
    html,
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);

}


export const createHtml =(subject , code)=> {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 50px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background: #4CAF50;
        color: white;
        text-align: center;
        padding: 20px;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content p {
        font-size: 16px;
        color: #333;
      }
      .content a {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        color: white;
        background-color: #4CAF50;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .content a:hover {
        background-color: #45a049;
      }
      .footer {
        padding: 10px;
        text-align: center;
        font-size: 12px;
        color: #888;
        background: #f4f4f4;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">${subject}</div>
      <div class="content">
        <p>Hello,</p>
        <p>Thank you for signing up! Please confirm your email address by clicking the button below:</p>
        <p >${code}</p>
      </div>
      <div class="footer">
        <p>If you didn’t request this, you can safely ignore this email.</p>
      </div>
    </div>
  </body>
  </html>`;
  }
  