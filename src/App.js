import React, { useState,  useEffect } from 'react'
import Filter from "./components/Filter";
import AddForm from "./components/AddForm";
import PhoneList from "./components/PhonesList";
import axios from 'axios';

const App = () => {
    const [ listOfPersons, setListOfPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [ persons, setPersons ] = useState(listOfPersons);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newSearch, setSearch ] = useState('');

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        event.preventDefault();
        setNewNumber(event.target.value);
    };

    useEffect(() => {
        console.log('effect');

        const eventHandler = response => {
            console.log('promise fulfilled')
            setListOfPersons(response.data)
        };

        const promise = axios.get('http://localhost:3001/persons');
        promise.then(eventHandler)
    }, []);

    const addName = (event) => {
        event.preventDefault();
        if (persons.find(item => item.name === newName)) {
           alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat({
                name: newName,
                number: newNumber
            }));
            setListOfPersons(listOfPersons.concat({
                name: newName,
                number: newNumber
            }));
            setNewName('');
            setNewNumber('');
        }
    };


    const handleSearch = (event) => {
        if (event.target.value === '') {
            setSearch('');
            setPersons(listOfPersons);
        } else {
            setSearch(event.target.value);
            let filteredPersons = listOfPersons.filter(person => person.name.toLowerCase().indexOf(newSearch.trim().toLowerCase()) !== -1);
            setPersons(filteredPersons);
        }

    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchVal={newSearch} onSearchName={handleSearch}/>
            <h3>Add new</h3>
           <AddForm newName={newName}
                    newNumber={newNumber}
                    onNameChange={handleNameChange}
                    onNumberChange={handleNumberChange}
                    onSubmitAdd={addName}/>
            <h2>Numbers</h2>
            <PhoneList persons={persons}/>
        </div>
    )
};

export default App;
