import { randomUUID } from 'node:crypto'
import { Database } from './database/database.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { name, job, title } = req.body

            const user = {
                id: randomUUID(),
                name,
                job,
                title
            }

            database.insert('users', user)

            return res.writeHead(201).end()
        }
    }
]