const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const users = require('./db.json').users;
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Custom route with login check, before JSON Server router
server.use(jsonServer.bodyParser)
server.post('/login', (req, res) => {
    let adminUser = users[0];
    let user = users.find(item => item.login === req.body.login && item.password === req.body.password);
    if (user) {
        res.jsonp({ loginStatus: true })
    } else {
        res.jsonp({ loginStatus: false })
    }
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

// Use default router

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})