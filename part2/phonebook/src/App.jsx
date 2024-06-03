import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";


const App = () => {

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifications, setNotification] = useState(null);

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
      : setPersons([
          ...persons,
          { name: newName, number: newNumber, id: persons.length + 1 },
        ]);
    
    setNotification(`${newName} was added to the phonebook.`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setNewName('');
    setNewNumber('');
  };

  const handleDelete = (id) => {
    const updatedPersons = persons.filter((person) => person.id !== id);
    setPersons(updatedPersons);
  };

  const onDeleteButtonClick = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      handleDelete(id);
      setNotification(`${newName}'s number was updated successfully.`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notifications && <div className="notification">{notifications}</div>}
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} onDeleteClick={onDeleteButtonClick} />
    </div>
  );
};

export default App;
