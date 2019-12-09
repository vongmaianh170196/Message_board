const express = require('express');
const connectDb = require('./config/db');

const app = express();

app.use(express.json({
    extended: false
}))
//Connect to Db
connectDb();

//Define routes
app.use('/api/channels', require('./routes/api/channels'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/user', require('./routes/api/user'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`${port}`))