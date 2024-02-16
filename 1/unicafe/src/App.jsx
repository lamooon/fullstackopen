import { useState } from 'react';

const StatisticsLine = (props) => {

    if (props.text === "positive") {
        return (
            <tr>
                <td>{props.text}</td>
                <td>{props.value * 100} %</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{props.text} </td>
            <td>{props.value}</td>
        </tr>
    )
}


const Statistics = ({good, neutral, bad}) => {

    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <StatisticsLine text="good" value={good}/>
                    <StatisticsLine text="neutral" value={neutral}/>
                    <StatisticsLine text="bad" value={bad}/>
                    <StatisticsLine text="all" value={good + neutral + bad}/>
                    <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)}/>
                    <StatisticsLine text="positive" value={(good) / (good + neutral + bad)}/>
                </tbody>
            </table>
        </div>
    );
}

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1);
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    }

    const handleBadClick = () => {
        setBad(bad + 1);
    }


    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={handleGoodClick} text="good" />
            <Button handleClick={handleNeutralClick} text="neutral" />
            <Button handleClick={handleBadClick} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App