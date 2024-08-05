import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoute } from './app/modules/student/student.route'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/students/', StudentRoute)

app.get('/', (req: Request, res: Response) => {
  const a = 4
  res.send(a)
})

export default app
