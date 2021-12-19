const expres = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

const app = expres();

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(process.env.PORT || 3001);
