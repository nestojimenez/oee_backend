import app from './app';
import transporter from './helpers/mailer';

app.listen(app.get('port'));

console.log('Server on port: ',app.get('port'))

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });