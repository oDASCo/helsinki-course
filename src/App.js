import React, { useState,  useEffect } from 'react'
import axios from 'axios';

const App = () => {
    const [ listOfCountries, setListOfCountries ] = useState([]);
    const [ countries, setCountries ] = useState(listOfCountries);
    const [ newSearch, setSearch ] = useState('');
    let country;
    let content;

    useEffect(() => {
        const eventHandler = response => {
            setListOfCountries(response.data)
        };

        const promise = axios.get('https://restcountries.eu/rest/v2/all');
        promise.then(eventHandler)
    }, []);

    const showCountry = (countryName) => {
        let country = countries.find(item => item.name === countryName);
        setCountries([country]);
    };


    const handleSearch = (event) => {
        if (event.target.value === '') {
            setSearch('');
            setCountries(listOfCountries);
        } else {
            setSearch(event.target.value);
            let filteredCountries = listOfCountries.filter(item => {
                return item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
            });
            setCountries(filteredCountries);
        }

    };
    if (countries.length > 10) {
        content = <p>Too many matches</p>
    } else if (countries.length === 1) {
        country = countries[0];
        if (country.name === 'Belarus') {
            content = <div>
                <h3>{country.name}</h3>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <p>Languages:</p>
                <ul>
                    {country.languages.map(item => <li>{item.name}</li>)}
                </ul>
                <img src={'https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Belarus_%281918%2C_1991%E2%80%931995%29.svg'}/>
            </div>
        } else {
            content = <div>
                <h3>{country.name}</h3>
                <p>capital: {country.capital}</p>
                <p>population: {country.population}</p>
                <p>Languages:</p>
                <ul>
                    {country.languages.map(item => <li>{item.name}</li>)}
                </ul>
                <img src={country.flag}/>
            </div>
        }
    } else {
        content = <ul>
            {countries.map((item) => {
                    return (<li>{item.name} <button onClick={() => showCountry(item.name)}>show</button></li>)
                }
            )
            }
        </ul>;
    }
    return (
        <div>
            <h2>Countries</h2>
            <input onInput={handleSearch}/>
            {content}
        </div>
    )

};

export default App;
