export class HttpError extends Error {
  statusCode: number;
  description: string | undefined;
  isJoi: boolean | undefined;
  constructor(
    name: string,
    message: string,
    statusCode: number,
    description?: string,
    isJoi?: boolean
  ) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.message = message;
    this.description = description;
    this.statusCode = statusCode;
    this.isJoi = isJoi;
    Error.captureStackTrace(this);
  }
}

export enum ErrorNames {
  CONTACT_US_FAIL = "CONTACT_US_FAIL",
  NOTIFY_EMAIL_SEND_FAIL = "NOTIFY_EMAIL_SEND_FAIL",
  VALIDATION_FAIL = "VALIDATION_FAIL",
}
