require('dotenv').config()
const connectToDatabase = require('./db')
const Item = require('./model/Item')

const headers = (contentType) => ({
  'Content-Type': contentType || 'application/json',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*'
})

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Item.create(JSON.parse(event.body))
        .then(item => callback(null, {
          statusCode: 200,
          headers: headers(),
          body: JSON.stringify(item)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: headers('text/plain'),
          body: 'Could not create the item.'
        }))
    })
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Item.findById(event.pathParameters.id)
        .then(item => callback(null, {
          statusCode: 200,
          headers: headers(),
          body: JSON.stringify(item)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: headers('text/plain'),
          body: 'Could not fetch the item.'
        }))
    })
}

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Item.find()
        .then(items => callback(null, {
          statusCode: 200,
          headers: headers(),
          body: JSON.stringify(items)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: headers('text/plain'),
          body: 'Could not fetch the items.'
        }))
    })
}

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Item.findByIdAndUpdate(
          event.pathParameters.id,
          JSON.parse(event.body),
          { new: true }
      )
        .then(item => callback(null, {
          statusCode: 200,
          headers: headers(),
          body: JSON.stringify(item)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: headers('text/plain'),
          body: 'Could not fetch the items.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Item.findByIdAndRemove(event.pathParameters.id)
        .then(item => callback(null, {
          statusCode: 200,
          headers: headers(),
          body: JSON.stringify({
            message: 'Removed item with id: ' + item.id,
            item: item
          })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: headers('text/plain'),
          body: 'Could not fetch the items.'
        }))
    })
}
