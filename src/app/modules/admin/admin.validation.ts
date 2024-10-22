import { z } from 'zod'
import { Types } from 'mongoose'

// Define the sub-types
const adminNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
})

const genderSchema = z.enum(['male', 'female', 'others'])

const bloodGroupSchema = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
])

// Define the TAdmin schema
const createAdminValidationSchema = z.object({
  id: z.string(),
  user: z.instanceof(Types.ObjectId),
  designation: z.string(),
  name: adminNameSchema,
  email: z.string().email(),
  gender: genderSchema,
  dateOfBirth: z.date().optional(),
  contactNumber: z.string(),
  emergencyContact: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  bloodGroup: bloodGroupSchema.optional(),
  profileImg: z.string().url().optional(),
  isDeleted: z.boolean(),
})

// Define the sub-types
const updateAdminNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

const updateGenderSchema = z.enum(['male', 'female', 'others']).optional()

const updateBloodGroupSchema = z
  .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  .optional()

// Define the update schema with optional fields
const updateAdminValidationSchema = z.object({
  id: z.string().optional(),
  user: z.instanceof(Types.ObjectId).optional(),
  designation: z.string().optional(),
  name: updateAdminNameSchema.optional(),
  email: z.string().email().optional(),
  gender: updateGenderSchema,
  dateOfBirth: z.date().optional(),

  contactNumber: z.string().optional(),
  emergencyContact: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  bloodGroup: updateBloodGroupSchema,
  profileImg: z.string().url().optional(),
  isDeleted: z.boolean().optional(),
})

// Export the schema
export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
}
