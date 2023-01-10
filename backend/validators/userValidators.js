import { body, validationResult } from 'express-validator' 
/* Messages */
import msg from '../messages/userValidationMessages.js'


const createNewUserValidator = [
  /* validate for field: name */
  body('username').notEmpty().withMessage(msg.NAME_IS_REQUIRED),
  body('username').isString().withMessage(msg.NAME_IS_NOT_STRING),

  /* validate for field: password */
  body('password').isLength({ min: 6, max: 50 }).withMessage(msg.PASSWORD_LENGTH_BELOW_MINIMUM_CHARACTERS),
  body('password')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,50}$/)
  .withMessage(msg.PASSWORD_IS_INCORRECT_FORM),
];

const loginUserValidator = [
  /* validate for field: password */ 
  body('password').notEmpty(),
];

const updateUserProfileValidator = [
  /* validate for field: name */
  body('username').notEmpty().withMessage(msg.NAME_IS_REQUIRED),
  body('username').isString(),
  body('username').exists(),
  /* validate for field: password */
  body('password').isEmpty().withMessage(msg.PASSWORD_CANNOT_BE_MODIFIED),
];

export { loginUserValidator,  createNewUserValidator, updateUserProfileValidator };