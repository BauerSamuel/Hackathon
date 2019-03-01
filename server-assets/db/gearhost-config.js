let mongoose = require('mongoose')



const connectionString = 'mongodb://molloy:Rr8Ey!L0Gf~1@den1.mongo1.gear.host:27001/molloy'

let connection = mongoose.connection
mongoose.connect(connectionString, { useNewUrlParser: true })



connection.on('error', err => {
  console.log('[database error]', err)
})

connection.once('open', () => {
  console.log('successfully connected to db')
})
