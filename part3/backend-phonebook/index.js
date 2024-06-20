const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();

const Persons = require("./models/persons");

app.use(express.json());
app.use(cors());
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res) => {
  Persons.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number mising" });
  }

  const person = new Persons({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })

});






const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});



