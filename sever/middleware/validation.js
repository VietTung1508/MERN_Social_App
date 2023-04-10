const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().min(3).max(16).required(),
  lastname: Joi.string().min(3).max(16).required(),
  username: Joi.string()
    .min(5)
    .max(16)
    .required()
    .pattern(new RegExp("^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validationUser = async (req, res, next) => {
  const user = req.body;
  try {
    await userSchema.validateAsync(user);
    next();
  } catch (e) {
    res.status(500).json(e.details[0].message);
  }
};

module.exports = { validationUser };
