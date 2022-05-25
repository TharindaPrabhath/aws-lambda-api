import { NextFunction, Request, Response } from "express";
import { ErrorNames, HttpError } from "../types/Error";

export const handleError = (
  err: HttpError,
  req: any,
  res: Response,
  next: NextFunction
) => {
  const error = {
    name: err.isJoi ? ErrorNames.VALIDATION_FAIL : err.name,
    message: err.message,
    description: err.description,
  };
  return res.status(getStatusCode(err)).json(error);
};

const getStatusCode = (err: HttpError): number => {
  if (err.isJoi) return 400;
  if (!err.statusCode) return 500;
  return err.statusCode;
};
