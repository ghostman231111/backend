const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose')
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth')

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message })
})
mongoose.connect("mongodb+srv://mongodb:admin@project.3usro.mongodb.net/?retryWrites=true&w=majority").
  then(() => app.listen(3000, () => console.log('Server has been started'))).
  catch(err => console.log('error', err))

