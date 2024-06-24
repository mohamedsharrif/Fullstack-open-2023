import React from "react";

const Persons = ({ filteredPersons, onDeleteClick }) => {
  
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
            <button onClick={() => onDeleteClick(person.id, person.name)}>Delete</button>
          </p>
        </div>
      ))}
    </>
  );
};

export default Persons;
