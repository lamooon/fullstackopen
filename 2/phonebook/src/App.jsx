import { useState, useEffect } from 'react';
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Person from "./components/Person.jsx";
import personService from "./services/people.js"
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [showAll, setShowAll] = useState('');
    const [errorMessage, setErrorMessage] = useState('some error happened');

    useEffect(() => {
        personService
            .getAll()
            .then(initialNames => {
                setPersons(initialNames);
            })
    }, []);


    const addNames = (event) => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newPhoneNumber
        }

        const containsName = (newName) => {
            for (let i = 0; i < persons.length; i++) {
                if (persons[i].name === newName) return true;
            }

            return false;
        }

        if (containsName(newName)) {
        //     asks if they want to update information
            if (window.confirm(`Do you want to update ${newName}'s information?`)) {
                const personToUpdate = persons.filter(person => person.name === newName);

                personService
                    .update(personToUpdate[0].id, nameObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== personToUpdate[0].id ? person : returnedPerson));
                    })
                    .catch(error => {
                        setErrorMessage(
                            `Note '${personToUpdate.name}' was already removed from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
        }
        else {
            personService
                .create(nameObject)
                .then(returnedName => {
                    setPersons(persons.concat(returnedName));
                });
        }

        setNewName('');
        setNewPhoneNumber('');
    }

    const handleDelete = (id) => {
        const personToDelete = persons.filter(person => person.id === id);
        if (window.confirm("Wish to remove this person from the phonebook?")) {
            personService
                .remove(personToDelete[0].id)
            setPersons(persons.filter(person => person.id !== id));
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
            <Notification message={errorMessage} />

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
            <ul>
                {result.map(person =>
                    <Person key={person.name} person={person} deletePerson={handleDelete} />
                )}
            </ul>
        </div>
    )
}

export default App