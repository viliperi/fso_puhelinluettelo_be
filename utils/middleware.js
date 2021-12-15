const morgan = require('morgan')

// Create a new token to morgan

morgan.token('req-body', (request, response) => {
  if (request.method === 'POST') {
    return 'added: ' + JSON.stringify(request.body)
  } else {
    return null
  }
})

// unknown endpoint midware

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// errorHandler midware

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: 'Name must be at least 3 characters and number at least 8 characters long.' })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  morgan
}