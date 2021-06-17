const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./db');
const router = require('./postRouter')
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connect error:'))

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

// app.get('/', (req, res) => {
//    res.send('message: server start!')
//})
const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });

app.use('/api', router)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
