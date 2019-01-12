const StaticServer = require('static-server')
const server = new StaticServer({
  rootPath: './dist',            // required, the root of the server file tree
  port: 3000               // required, the port to listen
  // host: '10.0.0.100',       // optional, defaults to any interface
})
console.log('hey')

server.start()
