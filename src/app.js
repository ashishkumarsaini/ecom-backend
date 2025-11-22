const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { CORS_ORIGIN } = require('./utils/secrets');
const { authRouter } = require('./routes/auth');
const { userRouter } = require('./routes/user');
const { addressRouter } = require('./routes/address');

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/user/address', addressRouter);

app.get('/health', (_req, res) => {
  res.status(200).json({
    message: 'API IS WORKING!!!',
  });
});

module.exports = app;
