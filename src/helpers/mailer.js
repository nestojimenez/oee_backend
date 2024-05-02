
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(({
  service: 'gmail',
  auth: {
    user: 'aguiladescalza@gmail.com',
    pass: 'Nesto982'
  }
}));



export default transporter;