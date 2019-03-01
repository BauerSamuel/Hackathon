let express = require('express')
let bodyParser = require('body-parser')
let server = express()
let cors = require('cors')

let port = 3000

server.use(cors())
server.use(express.static(__dirname + "/www"))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

require('./server-assets/db/gearhost-config')

let postRoutes = require('./server-assets/routes/post-routes')

//add comment routes at a later time

server.use('/api/posts', postRoutes.router)

server.listen(port, () => {
  console.log('server serving')
})
