import React, { useState,  useEffect } from 'react'
import Filter from "./components/Filter";
import AddForm from "./components/AddForm";
import PhoneList from "./components/PhonesList";
import phonesService from './services/phones'
import Notification from './components/Notification';

const App = () => {
    const [ listOfPersons, setListOfPersons ] = useState([]);
    const [ persons, setPersons ] = useState(listOfPersons);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newSearch, setSearch ] = useState('');
    const [notifMessage, setNotifMessage] = useState({
        text: '',
        type: 'general'
    });

    const handleNameChange = (event) => {
        event.preventDefault();
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        event.preventDefault();
        setNewNumber(event.target.value);
    };

    useEffect(() => {
        phonesService.getAll().then(response => {
            setListOfPersons(response.data);
            setPersons(response.data);
        });
    }, []);

    const addName = (event) => {
        event.preventDefault();
        if (persons.find(item => item.name === newName)) {
           let answer = window.confirm(`${newName} is already added to phonebook, replace old number?`);
           if (answer) {
               let personForUpdate = persons.find(item => item.name === newName);
               updatePerson(personForUpdate, newNumber);
           }
        } else {
            const personObj = {
                name: newName,
                id: +Date.now(),
                number: newNumber
            };
            phonesService
                .create(personObj)
                .then(response => {
                    setPersons(persons.concat(response.data));
                    setListOfPersons(listOfPersons.concat(response.data));
                    setNewName('');
                    setNewNumber('');
                    setNotifMessage({...notifMessage, text: `${newName}  successfully added`});
                    setTimeout(() => {
                        setNotifMessage('');
                    }, 3000);
                }).catch(err => {
                setNotifMessage({type: 'error', text: err.response.data.error});
                }
            );
        }
    };


    const handleSearch = (event) => {
        if (event.target.value === '') {
            setSearch('');
            setPersons(listOfPersons);
        } else {
            setSearch(event.target.value);
            let filteredPersons = listOfPersons.filter(person => person.name.toLowerCase().indexOf(event.target.value.trim().toLowerCase()) !== -1);
            setPersons(filteredPersons);
        }

    };

    const deletePerson = ({id, name}) => {
        let answer = window.confirm(`Delete ${name}`);
        if (answer) {
            phonesService
                .deletePerson(id)
                .then(() => {
                    let newList = persons.filter(person => person.id !== id);
                    setPersons(newList);
                    setListOfPersons(newList);
                })
        }
    };

    const updatePerson = ({id, name}) => {
        let updated = {
            id,
            name,
            number: newNumber
        };
        phonesService
            .update(updated, id)
            .then(response => {
                setPersons(persons.map(person => person.id !== id ? person : response.data));
                setListOfPersons(persons.map(person => person.id !== id ? person : response.data));
                setNewName('');
                setNewNumber('');
                setNotifMessage({...notifMessage, text: `Number for ${newName}  successfully updated`});
                setTimeout(() => {
                    setNotifMessage('');
                }, 3000);
            })
            .catch(err => {
                setNotifMessage({type: 'error', text: `Person ${newName} has already removed from server`});
                setTimeout(() => {
                    setNotifMessage('');
                }, 3000);
            });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchVal={newSearch} onSearchName={handleSearch}/>
            <h3>Add new</h3>
            <Notification message={notifMessage} />
           <AddForm newName={newName}
                    newNumber={newNumber}
                    onNameChange={handleNameChange}
                    onNumberChange={handleNumberChange}
                    onSubmitAdd={addName}/>
            <h2>Numbers</h2>
            <PhoneList persons={persons} onDelete={deletePerson}/>
        </div>
    )
};

export default App;
