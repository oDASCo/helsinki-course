import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    );
};

const Statistics = (props) => {
    if (props.good || props.neutral || props.bad) {
        return (
            <div>
                <table>
                    <tbody>
                    <Statistic text='Good' value={props.good}/>
                    <Statistic text='Neutral' value={props.neutral}/>
                    <Statistic text='Bad' value={props.bad}/>
                    <Statistic text='All' value={props.stats.all}/>
                    <Statistic text='Average' value={props.stats.average}/>
                    <Statistic text='Positive' value={props.stats.positive}/>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
};

const Statistic = ({text, value}) => <tr><td>{text}:</td><td>{value}</td></tr>;

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const stats = {
        all: good + neutral + bad,
        average: (good - bad) / (good + neutral + bad),
        positive: (good * 100) / (good + neutral + bad)
    };

    const addGoodFB = () => {
        setGood(good + 1);
    };

    const addNeutralFB = () => {
        setNeutral(neutral + 1);
    };

    const addBadFB = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <h2>Give feedback</h2>
            <Button handleClick={addGoodFB} text='Good'/>
            <Button handleClick={addNeutralFB} text='Neutral'/>
            <Button handleClick={addBadFB} text='Bad'/>

            <h3>Statistics</h3>

            <Statistics stats={stats}
                        good={good}
                        neutral={neutral}
                        bad={bad}/>

        </div>
    )
}

export default App;
