const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const sendMail = async (email, name, from, to, weight , deliveryId) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })
    
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: './src/views/',
        defaultLayout: false,
      },
      viewPath: './src/views/',
      extName: '.handlebars',
    }
    mailTransporter.use('compile', hbs(handlebarOptions))
    let mailDetails = {
      from: process.env.EMAIL,
      to: `${email}`,
      subject: 'Delivery Notification',
      text: 'Hey there, New Delivery Available ! ;) ',
      template: 'email',
      context: {
        name: name,
        from: from,
        to: to,
        weight: weight,
      },
    }

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs', err)
      } else {
        console.log('Email sent successfully', data)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendMail