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

// const a = (a, b, c) => {
//   // console.log(a,b,c);
// }
// const memoize = require('./helpers/cache').memoize;
//
// const c = memoize( a, 100);
// c(1,2,3)

const redisClient = require('./helpers/redis');
redisClient.connect();

const client = redisClient.getRedisClient();
client.get('a', (err, res)=>{
  console.log( err, res);
});
