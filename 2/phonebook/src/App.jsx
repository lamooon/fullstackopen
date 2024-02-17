import { useState } from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";


const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
    const [newName, setNewName] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [showAll, setShowAll] = useState('');

    const addNames = (event) => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newPhoneNumber,
            id: persons.length + 1
        }

        const containsName = (newName) => {
            for (let i = 0; i < persons.length; i++) {
                if (persons[i].name === newName) return true;
            }

            return false;
        }

        if (containsName(newName)) {
            alert(`${newName} is already added to phonebook`)
        }
        else {
            setPersons(persons.concat(nameObject));
            setNewName('');
            setNewPhoneNumber('');
        }

    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewPhoneNumber(event.target.value);
    }

    const handleSearchName = (event) => {
        setShowAll(event.target.value);
    }

    const result = (showAll === '')
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().includes(showAll));

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={showAll} onChange={handleSearchName} />

            <h3>add a new</h3>
            <PersonForm
                onSubmit={addNames}
                valueName={newName}
                valueNumber={newPhoneNumber}
                onChangeName={handleNameChange}
                onChangeNumber={handleNumberChange}
                />
            <h3>Numbers</h3>

            <Persons result={result} />
        </div>
    )
}

export default App