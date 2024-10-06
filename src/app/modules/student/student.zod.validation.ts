import { z } from 'zod'

// Define the UserName validation schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'Must be max length 20, characters')
    .nonempty('First name is required')
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First name must start with a capital letter',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()

    .nonempty({
      message: 'Last name is required',
    })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabetic characters',
    }),
})

// Define the Guardian validation schema
const guardianSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherContact: z.string().nonempty('Father contact is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherContact: z.string().nonempty('Mother contact is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
})

// Define the LocalGuardian validation schema
const localGuardianSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  contact: z.string().nonempty('Local guardian contact is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
})

// Define the Student validation schema
const createStudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().nonempty('password is required').max(20),

    student: z.object({
      name: userNameSchema,
      email: z
        .string()
        .nonempty('Email is required')
        .email('Email must be a valid email address'),
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().optional(),
      contactNumber: z.string().nonempty('Contact number is required'),
      emergencyContact: z.string().nonempty('Emergency contact is required'),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  createStudentZodValidationSchema,
}
