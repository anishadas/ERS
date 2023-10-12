const express = require('express');
const PORT = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const saasMiddleware = require('node-sass-middleware');
const db = require('./config/mongoose');
const session = require('express-session');
const passportLocal = require('./config/passportLocalStrategy');
const flash = require('connect-flash');
const middleware = require('./config/middleware');
const passport = require('passport');
const app = express();

// for saas
// debug: false in production as we dont wnat to thrw errors
// prefix: it will look for '/css/layout.css' with /css as prefix
app.use(saasMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.use(expressLayouts);


// extract styles & scripts from layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(session({
    name: "ERS",
    secret: "ersSystem",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
    if (err) console.log(`Error in running server: ${err}`);
    else console.log(`Server running on port ${PORT}`);
});