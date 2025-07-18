import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
  });

  res.status(err.statusCode).json({
    status: err.status,
    errors: [
      {
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    ],
    data: null,
  });
};

export default errorHandler;
