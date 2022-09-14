import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import config from 'config'

import log from './logger'
import AppError from './utils/AppError'
import { AppDataSource } from './db'

import employeeRouter from './router/employee.router'
import authRouter from './router/auth.router'

const port = (config.get('port') as number) || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())

app.use('/api/v1/employee', employeeRouter)
app.use('/api/v1/auth', authRouter)

app.get('/api/healthChecker', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'app is running',
  })
})

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`))
})

app.use((error: AppError, req: Request, res: Response) => {
  log.info(error)

  error.status = error.status || 'error'
  error.statusCode = error.statusCode || 500

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  })
})

const application = async () => {
  try {
    await AppDataSource.initialize()
    log.info(`Database successful connected`)
    app.listen(port, () => {
      log.info(`Server running on port ${port} `)
    })
  } catch (e) {
    log.error(e.message)
  }
}

application()
