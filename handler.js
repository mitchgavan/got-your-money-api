require('dotenv').config()
const connectToDatabase = require('./db')
const ItemModel = require('./model/Item')

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect Id',
})

module.exports.createItem = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const data = JSON.parse(event.body)
  
  const item = new ItemModel({
    id: data.id,
    title: data.title,
    cost: data.cost,
    date: data.date
  })

  const errors = item.validateSync()

  if (errors) {
    console.log(errors)
    db.close()
    callback(null, createErrorResponse(400, 'Invalid data supplied'))
  }

  connectToDatabase().then(() => {
    item
      .save()
      .then(() => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ 
            message: 'Item created successfully',
            id: item.id
          }),
        })
      })
      .catch((err) => {
        callback(null, createErrorResponse(err.statusCode, err.message))
      })
      .finally(() => {
        db.close()
      })
  })
}
