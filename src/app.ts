import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import expressWinston from 'express-winston';
import dotenv from 'dotenv';
import AppError from './utils/app-error';
import errorHandler from './middlewares/error-handler';

import authRoutes from './interfaces/routes/auth.routes';

dotenv.config();

const app = express();

app.use(morgan('dev'));

app.use(
  expressWinston.logger({
    transports: [new winston.transports.File({ filename: 'request.log' })],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.timestamp()
    ),
  })
);

app.use(express.json());

// Routes

app.use('/api/auth/login', authRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(new AppError('Route not found', 404));
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
