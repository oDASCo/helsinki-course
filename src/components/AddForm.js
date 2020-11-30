import React, { useState } from 'react'

const AddForm = ({onSubmitAdd, newName, newNumber, onNameChange, onNumberChange}) => {
    return (
        <div>
            <form onSubmit={onSubmitAdd}>
                <div>
                    name: <input value={newName} onChange={onNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={onNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
};

export default AddForm;
