import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import { StudentRoute } from './app/modules/student/student.route'
// import { UserRouter } from './app/modules/user/user.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFoundRoute from './app/middleware/notFoundRoute'
import router from './app/routes'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/', router)
// app.use('/api/v1/users/', UserRouter)

app.get('/', (req: Request, res: Response) => {
  const a = 4
  res.send(a)
})

// global error handler
app.use(globalErrorHandler)
app.use(notFoundRoute)
export default app
