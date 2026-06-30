import { body, validationResult } from "express-validator";

const validateRules = (method) => {
  switch (method) {
    case "register": {
      return [
        body("name", "Name is required").notEmpty().trim(),
        body("email", "Invalid email format").isEmail().normalizeEmail(),
        body("password", "Password must be at least 6 characters long").isLength({
          min: 6,
        }),
      ];
    }
    case "login": {
      return [
        body("email", "Invalid email format").isEmail().normalizeEmail(),
        body("password", "Password is required").notEmpty(),
      ];
    }
    case "post": {
      return [
        body("title", "Title is required and must not be empty").notEmpty().trim(),
        body("category", "Valid category is required").notEmpty().trim(),
        body("location", "Location is required").notEmpty().trim(),
        body("description", "Description is required").notEmpty().trim(),
      ];
    }
    case "comment": {
      return [body("text", "Comment text is required").notEmpty().trim()];
    }
    default:
      return [];
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ message: err.msg }));

  return res.status(400).json({
    message: extractedErrors[0].message,
    errors: extractedErrors,
  });
};

export { validateRules, validate };
