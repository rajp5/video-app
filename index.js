const express = require('express');
const app = express();
app.use(express.json());
const genres = require('./routes/genres')
app.use('/api/genres',genres)
const home = require('./routes/home');
app.use('/',home)

let port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on ${port}`))