import Joi from "@hapi/joi";

export const contactUsValidationSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().normalize().required(),
  message: Joi.string().trim().required(),
});
