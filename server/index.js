const express = require('express');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/indexRoute');
const loginRoute = require('./routes/loginRoute');
const adminRoute = require('./routes/adminRoute');
const path = require('path');
const PORT = 3011;

const app = express();

const session = require('express-session');


app.set('views', path.join(__dirname, '../source/template'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use(session({
  secret: 'rastetKartoshka',
  key: 'sessionKey',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 1000 * 60 * 10
  },
  saveUninitialized: false,
  resave: false

}));

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.status(307).redirect('/login');
};


app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/admin', isAdmin, adminRoute);


app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});




app.listen(PORT, () => {
  console.log(`Server is running on PORT - ${PORT}`);
});