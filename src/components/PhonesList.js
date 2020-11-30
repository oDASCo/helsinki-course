import React, { useState } from 'react'
import PhoneItem from "./PhoneItem";

const PhoneList = ({persons}) => {
    return (
        <div>
            <ul>
                {persons.map(person => {
                    return (
                        <PhoneItem key={person.name} person={person}/>
                    )
                })}
            </ul>
        </div>
    )
};

export default PhoneList;
