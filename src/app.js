const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/auth');

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello!!!',
  });
});

module.exports = { app };
