const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
require('./services/passport');
const keys = require('./config/keys');
require('./models/User');
mongoose.connect(keys.mongoURI);

const app = express();
require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(port, () => {
  console.log('listening at port ' + port);
});
