const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/persons.js')

app.use(express.static('dist'))

const morgan = require('morgan')

morgan.token('post', (req) => {
    if (req.method === 'POST') return ' ' + JSON.stringify(req.body)
    else return ' '
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    else if (error.name ==='ValidationError') {
        return response.status(400).json({ error: error.message })

    }
    next(error)
}


const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint, wth' })
}

app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
        res.json(p)
    })
})

app.get('/info', (req, res) => {
    res.send (`<p>Phonebook has info for ${Person.length} people.</p><p>${new Date()}</p>`)
})

app.post('/api/persons', (req, res, next) => {

    if(!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'name or number missing!'
        })
    }

    const person= new Person({
        name: req.body.name,
        number: req.body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(error => next(error))

})

app.get('/api/persons/:id', (req, res, next) => {

    Person.findById(req.params.id).then(p => {
        if (p) {
            res.json(p)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

    const { name, number } = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPersonInfo => {
            response.json(updatedPersonInfo)
        })
        .catch(error => next(error))
})

// All errorHandlers should be implemented last
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})