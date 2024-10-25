import { z } from 'zod'

// Zod validation schema for TPreRequisiteCourses
const PreRequisiteCoursesSchema = z.object({
  course: z.string(), // Expecting a MongoDB ObjectId
  isDeleted: z.boolean().optional(),
})

// Zod validation schema for TCourse
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourse: z.array(PreRequisiteCoursesSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

// Zod validation schema for TPreRequisiteCourses with optional fields
const UpdatePreRequisiteCoursesSchema = z.object({
  course: z.string().optional(), // ObjectId as string, made optional
  isDeleted: z.boolean().optional(), // Optional boolean
})

// Zod validation schema for TCourse with all fields optional
const UpdateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(), // Optional string
    prefix: z.string().optional(), // Optional string
    code: z.number().optional(), // Optional number
    credits: z.number().optional(), // Optional number
    preRequisiteCourse: z.array(UpdatePreRequisiteCoursesSchema).optional(), // Optional array of pre-requisite courses
    isDeleted: z.boolean().optional(), // Optional boolean for isDeleted flag
  }),
})

export const CourseValidations = {
  createCourseValidationSchema,
  UpdateCourseValidationSchema,
}
