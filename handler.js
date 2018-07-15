require('dotenv').config()
const connectToDatabase = require('./db')
const Item = require('./model/Item')

module.exports.createItem = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase().then(() => {
    Item.create(JSON.parse(event.body))
      .then(item => callback(null, {
        statusCode: 200,
        body: JSON.stringify(item)
      }))
      .catch(err => callback(null, {
        statusCode: err.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not create the item.'
      }))
  })
}
