import { z } from 'zod'

const FacultyNameSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required'),
})

// Zod schema for TGender enum
const GenderSchema = z.enum(['male', 'female', 'others'], {
  errorMap: () => ({
    message: 'Gender must be either male, female, or others',
  }),
})

const BloodGroupSchema = z.enum(
  ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  {
    errorMap: () => ({ message: 'Invalid blood group' }),
  },
)

const createFacultyValidationSchema = z.object({
  body: z.object({
    // password: z.string().max(20),
    faculty: z.object({
      // id: z.string().nonempty('ID is required'),

      name: FacultyNameSchema,
      email: z
        .string()
        .email('Invalid email address')
        .nonempty('email number is required'),
      gender: GenderSchema,
      dateOfBirth: z.string().optional(), // Coerce any date-like value into a JS Date object
      contactNumber: z.string().nonempty('Contact number is required'),
      emergencyContact: z.string().nonempty('Emergency contact is required'),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      bloodGroup: BloodGroupSchema.optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string(),
    }),
  }),
})

// update schema

const updateFacultyNameSchema = z.object({
  firstName: z.string().nonempty('First name is required').optional(),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required').optional(),
})

// Zod schema for TGender enum
const updateGenderSchema = z
  .enum(['male', 'female', 'others'], {
    errorMap: () => ({
      message: 'Gender must be either male, female, or others',
    }),
  })
  .optional()

const updateBloodGroupSchema = z
  .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: 'Invalid blood group' }),
  })
  .optional()

const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z
      .object({
        id: z.string().nonempty('ID is required').optional(),
        name: updateFacultyNameSchema.optional(),
        email: z
          .string()
          .email('Invalid email address')
          .nonempty('Email is required')
          .optional(),
        gender: updateGenderSchema,
        dateOfBirth: z.coerce.date().optional(), // Coerce any date-like value into a JS Date object
        contactNumber: z
          .string()
          .nonempty('Contact number is required')
          .optional(),
        emergencyContact: z
          .string()
          .nonempty('Emergency contact is required')
          .optional(),
        presentAddress: z
          .string()
          .nonempty('Present address is required')
          .optional(),
        permanentAddress: z
          .string()
          .nonempty('Permanent address is required')
          .optional(),
        bloodGroup: updateBloodGroupSchema,
        profileImg: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .optional(),
  }),
})

export const FacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
}
