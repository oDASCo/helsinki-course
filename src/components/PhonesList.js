import React, { useState } from 'react'
import PhoneItem from "./PhoneItem";

const PhoneList = ({persons, onDelete}) => {
    return (
        <div>
            <ul>
                {persons.map(person => {
                    return (
                        <PhoneItem key={person.name} person={person} onDelete={onDelete}/>
                    )
                })}
            </ul>
        </div>
    )
};

export default PhoneList;
