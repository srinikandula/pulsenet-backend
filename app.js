var express = require('express');
require('dotenv').config();
app = express();
var bodyParser = require('body-parser')
const port=process.env.APP_PORT;

app.listen(port, () => console.log(`app listing on port ${port} !!`));

app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(bodyParser.json());
  
app.use(require('./middleware').middleware);
app.use('/api', require('./routes'));

app.get('/Ping', (req, res) => {
    res.send('Hello word');
});