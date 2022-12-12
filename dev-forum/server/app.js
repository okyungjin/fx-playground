const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./config/cors');
const routes = require('./routes');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use('/', routes);


  app.use((req, res, next) => {
  const error = new Error(`router for ${req.method} ${req.url} is not exist.`)
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Internal server error.';
  res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(app.get('port'), () => {
  console.log(`server is running http://localhost:${process.env.PORT || 3000}`);
});
