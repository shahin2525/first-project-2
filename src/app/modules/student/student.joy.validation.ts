import Joi from 'joi'

// Define the UserName validation schema
const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'Must be max length 20, character',
      'string.pattern.base': 'First name must start with a capital letter',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.base':
        'Last name must contain only alphabetic characters',
    }),
})

// Define the Guardian validation schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherContact: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContact: Joi.string().required(),
  motherOccupation: Joi.string().required(),
})

// Define the LocalGuardian validation schema
const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  contact: Joi.string().required(),
  occupation: Joi.string().required(),
})

// Define the Student validation schema
const studentJoyValidationSchema = Joi.object({
  id: Joi.string().optional(),

  name: userNameSchema.required(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': '{VALUE} is not a valid email',
  }),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.date().optional(),
  contactNumber: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().required(),
  isActive: Joi.string().valid('active', 'inActive').default('active'),
})

export default studentJoyValidationSchema
