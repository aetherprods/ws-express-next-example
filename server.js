const express = require('express')
const next = require('next')
const SocketServer = require('ws').Server;
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.all('*', (req, res) => {
    return handle(req, res)
    })

    server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
    })

    const wss = new SocketServer({ server });

    wss.on('connection', function connection(ws, request) {
        console.log('Client connected');
        ws.on('close', () => console.log('Client disconnected'));
    });
    wss.on('error', function (error) {
        console.log(error);
    });

    setInterval(() => {
        wss.clients.forEach((client) => {
          client.send(new Date().toTimeString());
        });
      }, 1000);    

}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
