require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const ErrorMiddleware = require('./errors');
const Routes = require('./routes');

const corsOptions = {
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, PATCH',
    optionsSuccessStatus: 200,
};
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(express.json());

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  next();
});

app.use(Routes);
app.use(ErrorMiddleware);

// app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));

module.exports = app;
module.exports.handler = serverless(app);
