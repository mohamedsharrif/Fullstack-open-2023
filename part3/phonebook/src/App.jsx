
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
  const [filter, setFilter] = useState("");
  

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
         setErrorMessage('Failed to fetch data. Please try again later.');
      });
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const isExists = persons.some((person) => person.name === newName);

    if (isExists) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    axios.post(baseUrl, newPerson)
      .then(response => {
        setPersons([...persons, response.data]);
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        console.error('Error adding person:', error);
        setErrorMessage('Failed to add person. Please try again later.'); 
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setNotification(`Deleted successfully.`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
        setErrorMessage("Failed to delete person. Please try again later.");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };
  

  const onDeleteButtonClick = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      handleDelete(id);
    }
  };
  

  return (
    <div>
      <h2>Phonebook</h2>
      {notifications && <div className="notification">{notifications}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onDeleteClick={onDeleteButtonClick} />
    </div>
  );
};

export default App;

