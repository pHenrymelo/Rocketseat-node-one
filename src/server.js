import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if(url === '/users' && method ==='GET'){
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if(url === '/users' && method ==='POST'){

        users.push({
            id: 137,
            name: 'Pedro Melo',
            job: 'shadow monarch',
            title: 'the one who left it all behind'
        })

        return res.end("criar usuario")
    }

    return res.end("Hello Node")
})

server.listen(3333)