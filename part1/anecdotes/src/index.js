import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <>
      <h1>
        {props.text}
      </h1>
    </>
  )
}

const Button = (props) => {
  return (
    <button 
      onClick={props.handleClick}>{props.text}
    </button>
  )
}

const Text = (props) => {
  return(
    <>
      <p>
        {props.text}
      </p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const voteToSelected = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const setToSelected = () => setSelected(getRandomNumber(0, anecdotes.length))

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Text text={anecdotes[selected]} />
      <Text text= {"has " + votes[selected] + " votes"} />
      <Button handleClick={setToSelected} text="next anecdote" />
      <Button handleClick={voteToSelected} text="vote" />
      <Header text="Anecdote with most votes" />
      <Text text={anecdotes[votes.indexOf(Math.max(...votes))]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)