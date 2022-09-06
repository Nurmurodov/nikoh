import { DataSource } from 'typeorm'
import config from 'config'

const database = config.get('db') as string
const username = config.get('db_user_name') as string
const password = config.get('db_password') as string
const port = config.get('db_port') as number
const host = config.get('db_host') as string

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.ts'],
})
