const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const route = require('./routes/recipes');


// Connect To Database
mongoose.connect(config.database)
  .then(() => console.log(`Connected to database ${config.database}`))
  .catch((err) => console.log(`Database error: ${err}`));

const app = express();

const users = require('./routes/users');
const recipes = require('./routes/recipes');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());


// Body Parser Middleware
app.use(bodyParser.json());
app.use('/users', users);
app.use('/api', recipes);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Index Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});




// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});