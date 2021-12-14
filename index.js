const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const { request } = require('express')

// heti alussa tarvittavien midwarejen käyttöönotto

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

// morgan midwaren käyttöönotto ja uuden tokenin luonti.

morgan.token('req-body', (request, response) => {
    if (request.method === 'POST') {
       return 'added: ' + JSON.stringify(request.body)
    } else {
        return null
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

// backend-puolen toimintojen määrittäminen

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
        console.log('Persons delivered as requested')
    })
    .catch(error => next(error))
})

/* fix this later */

app.get('/info', (request, response, next) => {
    const date = new Date()

    Person.count().then(count => {
        response.send(`Phonebook has info for ${count} people
        <br /> 
        <br />
        ${date}`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'name or number is missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// väärän end-pointin midware

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Error handles middleware. HOX: Error handler midware should be applied last!

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

app.use(errorHandler)

// käytetyn portin määrittely

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})