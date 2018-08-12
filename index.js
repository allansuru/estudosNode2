const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const Joi = require('joi');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();
const helmet = require('helmet')
const morgan = require('morgan');


const logger = require('./middleware/logger')
const authenticating = require('./middleware/authenticate')
//Middleware Function

app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
 app.set('views', './views'); // default

app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.static('public'));
// app.use(helmet())

/* add um midlware no request que gera um log, 
 lembrar sempre que add midlware impacta na performace*/

 console.log(`NODE ENV: ${process.env.NODE_ENV }`);
 // or
 // console.log(app.get('env'));

 // Configuration

 console.log(`Application name: ${config.get('name')}`);
 console.log(`Mail Server: ${config.get('mail.host')}`);
 console.log(`Mail Password: ${config.get('mail.password')}`);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
    startupDebugger('DEV')
}

// DB OK
dbDebugger('Db connected OK!');



app.use(logger);
app.use(authenticating);
app.use('/api/courses' ,courses);
app.use('/', home);


//PORT
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Nodemon rodando na porta ${port}.`));