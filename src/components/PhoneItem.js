import React, { useState } from 'react'

const PhoneItem = ({person, onDelete}) => {
    return (
        <li key={person.name}>{person.name} <i>{person.number}</i> <button onClick={() => onDelete(person)}>delete</button></li>
    )
};

export default PhoneItem;
