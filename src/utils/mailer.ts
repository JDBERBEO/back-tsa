import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

async function verify() {
  try {
    const connection = await transporter.verify();
    if (connection) {
      console.log('Server ready to take messages');
    }
  } catch (error) {
    console.log(error);
  }
}
async function newContactUs(
  email: string,
  name: string,
  userEmail: string,
  message: string
) {
  await transporter.sendMail({
    from: `"${process.env.MAILER_USER}"`,
    to: email,
    subject: 'Nuevo Mensaje de Contáctenos',
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
  });
}

async function newClaimAlert(email: string) {
  await transporter.sendMail({
    from: `"${process.env.MAILER_USER}"`,
    to: email,
    subject: 'Nueva Demanda',
    html: `
      <div>
          <h1>Hola Admin,</h1>
          <p>
          Recién llegó una nueva reclamación para revisión. Porfavor, revisa el listado.</p><br/><br/>
          <p>Cordialmente,</p><br/><br/>
          <p>Equipo de MeRetracto.</p><br/>
      </div>
      `,
  });
}

async function downloadModels(email: string, previousClaim: string) {
  await transporter.sendMail({
    from: `"${process.env.MAILER_USER}"`,
    to: email,
    subject: 'Modelos descargables',
    html: `
      <div>
          <h1>Hola</h1>
          <p>
          Se ha creado con éxito tú demanda, en estos momentos está en revisión por parte del equipo jurídico de MeRetracto. Es un placer que hayas contado con nuestros servivicios. Recuerda que si no has realizado una reclamación directamente a la aerolínea, debes presentar una para que la sic acepte tu demanda. El link que sigue, puedes descargar un modelo que puedes utilizar como reclamación previa:</p><br/><br/>
          ${previousClaim}
          <p>Cordialmente,</p><br/><br/>
          <p>Equipo de MeRetracto.</p><br/>
      </div>
      `,
  });
}

module.exports = {
  transporter,
  verify,
  newContactUs,
  newClaimAlert,
  downloadModels,
};
