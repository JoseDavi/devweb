const expres = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = expres();

app.use(bodyParser.json());
app.use('/', routes);

app.listen(process.env.PORT || 3000);
