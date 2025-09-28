const express = require('express');
const { authRouter } = require('./routes/auth');

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello!!!',
  });
});

app.use('/api/auth', authRouter);

module.exports = { app };
