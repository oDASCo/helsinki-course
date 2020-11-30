import React, { useState } from 'react'

const Filter = ({searchVal, onSearchName}) => {
    return (
        <div>
            <span>Filter shown with</span><input value={searchVal} onInput={onSearchName}/>
        </div>
    )
};

export default Filter;
