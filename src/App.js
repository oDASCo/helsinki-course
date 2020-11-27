import React, { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ];
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });

    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random() * (anecdotes.length)));
    };
    const vote = () => {
        setVotes({
            ...votes,
            [selected]:  votes[selected] += 1
        });
    };

    const getAnecdoteMaxVotes = () => {
        return Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
    };

    return (
        <div>
            <h3>Anecdote of the day</h3>
            <p>{anecdotes[selected]}</p>
            <button onClick={nextAnecdote}>next anecdote</button>
            <button onClick={vote}>vote</button>
            <h3>Anecdote with  most votes</h3>
            <p>{anecdotes[getAnecdoteMaxVotes()]}</p>
        </div>
    )
};

export default App;
