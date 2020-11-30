import React, { useState } from 'react'

const PhoneItem = ({person}) => {
    return (
        <li key={person.name}>{person.name} <i>{person.number}</i></li>
    )
};

export default PhoneItem;
