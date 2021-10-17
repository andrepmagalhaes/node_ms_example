import RabbitmqServer from "./rabbitmqServer";
import nodemailer from 'nodemailer';
require('dotenv').config();

interface params {
    path:string,
    targetEmail:string,
    numProducts:string
}

async function sendEmail(params:params) {
    // let testAccount = await nodemailer.createTestAccount();

    // console.log(testAccount);
    
    
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'etest230495@outlook.com', // generated ethereal user
        pass: 'emailtest123', // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <etest230495@outlook.com>', // sender address
      to: params.targetEmail, // list of receivers
      subject: "Number of products", // Subject line
      text: `Store: ${params.path}\nNumber of products: ${params.numProducts}`, // plain text body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

async function getMsg(uri:string) {
  
  let retries:number = 10;
  const rabbitmqServer:RabbitmqServer = new RabbitmqServer(uri);
  
  while(retries)
  {
    try
    {
      await rabbitmqServer.start();
      break;
    }
    catch(err)
    {
      console.error(err);
      retries--;
      console.log(`retries left ${retries}`);
      
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  rabbitmqServer.consume(process.env.RABBITMQ_SEND_EMAIL_QUEUE, ((msg) => {
      const params:params = {
          ...JSON.parse(msg.content.toString())
      };
      sendEmail(params);
  }));

}

const queueHost:string = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

try
{
    getMsg(queueHost);
}
catch(err)
{
    console.error(err);
}