export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(422).json({
        success: false,
        message: "Validation error",
        errors: error.details.map(d => d.message),
      });
    }

    req[property] = value;
    next();
  };
};
