const express = require('express')
const dbModule = require('../sequelize/db')
const logger = require('../lib/log')(__filename)
const {patch} = require('./database_router')

let server = null
let app = null

const getApp = () => {
  return app
}

const startServer = async (portNumber) => {
  await dbModule.start()
  /**const user = await signUp({
    username: 'Postman3',
    email: 'aliceladygo+3@gmail.com',
    password: 'Batman88'
   
  })
  console.log(user)*/
  return new Promise((resolve, reject) => {
    app = express()
    app.use(express.json())
    
    app.patch('/api/users/:id',patch)
    server =  app.listen(portNumber, () => {
      resolve(app)
      logger.info(`Listening on portNumber ${portNumber}`)
    })
  })
}

const stopServer = () => {
  server.close()
  logger.info("The server has been closed")
}

module.exports = {
  startServer,
  stopServer,
  getApp
}

