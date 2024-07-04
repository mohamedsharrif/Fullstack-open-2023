const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const app = express()
require('dotenv').config()
const Persons = require('./models/persons')

app.use(express.json())

app.use(cors({
  origin: 'https://mybackend-phonebook.fly.dev',
}))


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/api/persons', (req, res) => {
  Persons.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = new Persons({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Persons.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body

  if (!number) {
    return res.status(400).json({ error: 'number missing' })
  }

  Persons.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).json({ error: 'Person not found' })
      }
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
