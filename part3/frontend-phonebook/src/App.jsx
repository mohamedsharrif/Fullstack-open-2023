import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifications, setNotification] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("API URL:", baseUrl);
    axios
      .get(baseUrl)
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to fetch data. Please try again later.");
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

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        axios
          .put(`${baseUrl}/${existingPerson.id}`, { number: newNumber })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response.data
              )
            );
            setNewName("");
            setNewNumber("");
            setNotification(`Updated ${newName}'s number`);
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            if (error.response && error.response.data.error) {
              setErrorMessage(error.response.data.error);
            } else {
              setErrorMessage(
                "Failed to update person. Please try again later."
              );
            }
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      axios
        .post(baseUrl, newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          if (error.response && error.response.data.error) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("Failed to add person. Please try again later.");
          }
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    }
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
      <Persons
        filteredPersons={filteredPersons}
        onDeleteClick={onDeleteButtonClick}
      />
    </div>
  );
};

export default App;
