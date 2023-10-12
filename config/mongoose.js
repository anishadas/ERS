const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://payalad10:GJeekSLld0wtoqq3@cluster0.jqxl55x.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to database'));
db.once('open', () => console.log("connected to database"));

//GJeekSLld0wtoqq3