export enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,

  /* Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response. */
  UNAUTHORIZED = 401,

  /* The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server. */
  FORBIDDEN = 403,
  NOT_FOUND = 404,

  /* The request could not be completed due to a conflict with the current state of the resource */
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
