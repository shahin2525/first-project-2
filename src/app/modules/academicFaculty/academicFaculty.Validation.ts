import { z } from 'zod'

// creating a schema for strings
const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string',
    }),
  }),
})
const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string',
    }),
  }),
})

export const AcademicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
}
