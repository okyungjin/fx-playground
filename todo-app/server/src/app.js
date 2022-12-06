const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./config/cors');
const indexRouter = require('./routes');
const todosRouter = require('./routes/todos');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/todos', todosRouter);

app.use((req, res, next) => {
  const error = new Error(`router for ${req.method} ${req.url} is not exist.`)
  error.status = 404;
  next(error);
});

app.use((err, res, req, next) => {
  console.log(err);
  res.locals.meesage = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});
