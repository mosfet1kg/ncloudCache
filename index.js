require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const redisClient = require('./helpers/redis');

redisClient.connect();

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

    geolocationApi.getLocation({ ip: req.ip })
      .then( result => {
        res( result );
      })
      .catch( err => next(err) );

  });

app.use((err, req, res, next) =>{
  res.statusCode = 500;
  res.send({ message: err.message });
});

app.listen(10010, function () {
  console.log('This Server is running on the port ' + this.address().port);
});

const memoize = require('./helpers/cache').memoize;

const geoMemoizationFn = memoize( geolocationApi.getLocation, 10000);

geoMemoizationFn({ip: '143.248.142.77'})
  .then(res=>{
    console.log( res );
  });


