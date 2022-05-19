const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// Show info
app.get('/info', (request, response) => {
  const info = `<p>Phonebook has info for ${persons.length} people<p>` 
  let now = Date.now()
  let dateInfo = `<p>${new Date(now)}</p>`
  response.send(`${info}${dateInfo}`)
})

// GET all 
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// GET one 
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  persons = persons.filter((person) => person.id === id)
  console.log(persons)
  response.json(persons)
})

// DELETE (by id)
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log(persons)
  response.status(204).end()
})

// POST new
const randomId = () => Math.floor(Math.random() * 1000)
console.log(randomId())
app.post('/api/persons', (request, response) => {
  const person = request.body

  if(!person.name || !person.number){
    return response.status(400).json({
      error: 'The content is missing'
    })
  }

  if (persons.some(({name}) => name === person.name )){
    return response.status(400).json({
      error: 'The name has to be unique '
    })
  }
  
  const newPerson = {
    name: person.name,
    number: person.number,
    id: randomId()
  }
  persons = persons.concat(newPerson)
  console.log(persons)
  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)