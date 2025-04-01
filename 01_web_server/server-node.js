import http from 'http'

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.statusCode = 200
        res.setHeader('content-type', 'text/plain')
        res.end('Hello')
    } else if(req.url === '/login') {
        res.statusCode = 205;
        res.setHeader("content-type", "text/plain");
        res.end("Login Page")
    } else if(req.url === '/register') {
        res.statusCode = 220
        res.end('Register Page')
    } else {
        res.statusCode = 500;
        res.end('Bad Request')
    }
})

server.listen(port, hostname, () => {
    console.log(`server is running on http://${hostname}:${port}`);
})
