
import React, { useState } from "react";

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  if (all == 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine
            text="average"
            value={
              (Math.round((props.good * 1 + props.neutral * 0 + props.bad * (-1)) / all * 10) / 10).toFixed(1)
            }
            
          />
          <StatisticLine
            text="positive"
            value={`${(parseFloat(props.good / all) * 100).toFixed(1)}%`}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = (props) => {
  return (
    <div style={{ display: 'inline-block', margin: '5px' }}>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> setGood(good + 1) } text="good" />
      <Button handleClick={()=> setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={()=> setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
