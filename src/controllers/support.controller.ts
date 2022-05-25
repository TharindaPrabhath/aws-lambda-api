import { NextFunction, Request, Response } from "express";
import { contactUs, notify } from "../services/support.service";
import { ErrorNames, HttpError } from "../types/Error";
import { HttpStatusCodes } from "../types/Http";
import { contactUsValidationSchema } from "../validations/support.validation";

export const handleContactUs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vRes = await contactUsValidationSchema.validateAsync(req.body);
    await contactUs(vRes);
    res.status(HttpStatusCodes.OK).send();
  } catch (err) {
    next(err);
  }
};

export const handleNotify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.query?.email;
    if (!email)
      throw new HttpError(
        ErrorNames.NOTIFY_EMAIL_SEND_FAIL,
        "No email address was found in the request",
        HttpStatusCodes.BAD_REQUEST
      );
    await notify(email as string);
    res.status(HttpStatusCodes.OK).send();
  } catch (err) {
    next(err);
  }
};
