import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifications, setNotification] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const updatedPersons = persons.filter((person) => person.id !== id);
    setPersons(updatedPersons);
  };

  const onDeleteButtonClick = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      handleDelete(id);
      setNotification(`${name}'s number was updated successfully.`); 
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
