import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleFilter = (e) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );

    setPersons(filteredPersons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isExists =
      persons.filter((person) => person.name === newName).length > 0;
    isExists
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, { name: newName, number: newNumber }]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  );
};

export default App;
