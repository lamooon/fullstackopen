const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));


morgan.token('post', (req) => {
    if (req.method === 'POST') return ' ' + JSON.stringify(req.body);
    else return ' ';
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));

let persons =
    [
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
        },
        {
            "id": 5,
            "name": "Test User",
            "number": "1234-5707"
        }
    ]

const generateId = () => {
    return Math.random() * Number.MAX_VALUE;
}

app.post('/api/persons', (req, res) => {

    if(!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: "name or number missing!"
        })
    }
    else if (persons.filter(p => p.name.toLowerCase() === req.body.name.toLowerCase()).length > 0) {
        return res.status(400).json({
            error: "Same person exists in the phonebook"
        })
    }

    const person= {
        id: generateId(),
        name: req.body.name,
        number: req.body.number
    }


    persons = persons.concat(person);
    res.json(person);

})

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(p => p.id === Number(req.params.id));

    if (person) {
        res.json(person);
    } else {
        res.send("PERSON NOT FOUND!");
        // res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
})

app.get('/info', (req, res) => {
    res.send (`<p>Phonebook has info for ${persons.length} people.</p><p>${new Date()}</p>`);
})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})