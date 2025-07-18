import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: { id: number; email: string };
}

export interface ResponseData {
  status: string;
  message: string;
  data: any;
  errors: { message: string; stack?: string }[] | null;
}
