import { ResponseData } from '../types';
import { Response } from 'express';

export const sendResponse = (
  res: Response,
  statusCode: number,
  data: any,
  message: string
) => {
  const response: ResponseData = {
    status: 'success',
    message,
    data,
    errors: null,
  };
  res.status(statusCode).json(response);
};
