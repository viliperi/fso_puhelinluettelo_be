const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())

morgan.token('req-body', (request, response) => {
    if (request.method === 'POST') {
       return 'added: ' + JSON.stringify(request.body)
    } else {
        return null
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

app.use(express.json())


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    {
        id: 5,
        name: "Harry Potter",
        number: "45-235318458"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
    console.log('Persons delivered as requested')
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `Phonebook has info for ${persons.length} people
        <br /> <br />
        ${date}`)
})

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateRandomId = () => {
    return Math.floor(Math.random() * 10000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({error: 'name or number is missing'})
    }
    
    if (persons.some(p => p.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())) {
        return response.status(400).json({error: 'Person name must be unique.'})
    }

    const person = {
        id: generateRandomId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})