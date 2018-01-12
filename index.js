require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRouter = express.Router();

const geolocationApi = require('./helpers/geolocation');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/user', userRouter);

userRouter.route('/geolocation')
  .get( (req, res, next) => {
    const ip = req.ip.replace('::ffff:','');

    geolocationApi.getLocation({ ip }, (error, response) => {
      if ( error ) {
        return next(error);
      }

      res.send( response );
    });
  });

app.use((err, req, res, next) =>{
  res.statusCode = 500;
  res.send({ message: err.message });
});

app.listen(10010, function () {
  console.log('This Server is running on the port ' + this.address().port);
});
