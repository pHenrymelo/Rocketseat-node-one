import { randomUUID } from 'node:crypto'
import { Database } from './database/database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const { search } = req.query
            const users = database.select('users', search ? {
                name: search,
                job: search,
                title: search
            } : null)
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
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
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            database.delete('users', id)

            return res.writeHead(204).end()

        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { name, job, title } = req.body

            database.update('users', id, {
                name,
                job,
                title
            })


            return res.writeHead(204).end()

        }
    }
]