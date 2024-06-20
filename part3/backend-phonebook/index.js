const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require('dotenv').config();

const Persons = require('./models/persons');

app.use(express.json());
app.use(cors());
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get('/api/persons', (req, res) => {
  Persons.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});





// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

// app.get("/api/persons", (req, res) => {
//   res.json(persons);
// });

// app.get("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const person = persons.find((person) => person.id === id);
//   res.json(person);

//   if (person) {
//     res.json(person);
//   } else {
//     res.status(404).end();
//   }
// });

// app.get("/info", (req, res) => {
//   const CurrentTime = new Date();
//   const numberOfPersons = persons.length;

//   const ResponseText = `<p>Phonebook has info for ${numberOfPersons} people</p>
//     <p>${CurrentTime} (Eastern European Standard Time)</p>`;
//   res.send(ResponseText);
// });
// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   res.status(204).end();
// });

// app.post("/api/persons", (req, res) => {
//   const body = req.body;
//   if (!body.name || !body.number) {
//     return res.status(400).json({
//       error: "name or number is missing",
//     });
//   }
//   if (persons.some((person) => person.name === body.name)) {
//     return res.status(400).json({
//       error: "name must be unique",
//     });
//   }
//   const maxId =
//     persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;

//   const person = {
//     id: maxId + 1,
//     name: body.name,
//     number: body.number,
//   };

//   persons = persons.concat(person);

//   res.json(person);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
