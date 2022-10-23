import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth:{
      user:process.env.MAILER_USER,
      pass:process.env.MAILER_PASS
  }
})

async function verify(){
try{
  const connection = await transporter.verify()
  if(connection){
          console.log("Server ready to take messages");
      }
  }catch(error){
      console.log(error)
  }
}
async function newContactUs({eemail, name, userEmail, message}){
  await transporter.sendMail({
      from: `"${process.env.MAILER_USER}"`,
      to: eemail,
      subject: "Nuevo Mensaje de Contáctenos",
      html: `
      <div>
          <h1>Hola Admin,</h1>
          <p>
          Ha llegado un nuevo mensaje del área de contáctenos con la siguiente información</p><br/>
          <p>Nombre: ${name}</p><br/>
          <p>Email: ${userEmail}</P><br/>
          <p>Mensaje: ${message}</p><br/>
      </div>
      `,
      })
  }


  module.exports = {
      transporter,
      verify,
      newContactUs
}