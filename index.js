const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRouter = express.Router();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/user', userRouter);

userRouter.route('/geolocation')
  .get( (req, res, next) => {
    res.send(req.ip);
  });

app.listen(10010, function () {
  console.log('This Server is running on the port ' + this.address().port );
});