import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <>
    <h1>{props.text}</h1>
    </>
  )
}

const Button = (props) => (
  <button 
    onClick={props.handleClick}>{props.text}
  </button>
)

const Statistics = (props) => {
  if(props.good || props.neutral || props.bad)
  {
    return(
      <div>
        <table>
          <Statistic text={props.feedbacktypes.good} value={props.good} />
          <Statistic text={props.feedbacktypes.neutral} value={props.neutral}/>
          <Statistic text={props.feedbacktypes.bad} value={props.bad}/>
          <Statistic text={props.feedbacktypes.all} value={props.good + props.neutral + props.bad}/>
          <Statistic text={props.feedbacktypes.average} value={(props.good + props.neutral + props.bad)/3}/>
          <Statistic text={props.feedbacktypes.positive} value={(props.good/(props.good + props.neutral + props.bad))*100}/>
        </table>
      </div>
    )
  }

  return (
    <>
      <p>
        No feedback given
      </p>
    </>
  )
}

const Statistic = (props) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.text}</td> 
          <td>{props.value}</td>
        </tr>
      </tbody>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0) 

  const feedbacktypes = { good: "good", neutral: "neutral", bad: "bad", all: "all", average: "average", positive: "positive" }

  const setToGood = () => setGood(good + 1)

  const setToNeutral = () => setNeutral(neutral + 1)

  const setToBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={setToGood} text={feedbacktypes.good} />
      <Button handleClick={setToNeutral} text={feedbacktypes.neutral} />
      <Button handleClick={setToBad} text={feedbacktypes.bad}/>
      <Header text="statistics" />
      <Statistics feedbacktypes={feedbacktypes} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)