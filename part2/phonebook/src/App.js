import React, { useState, useEffect } from 'react'
import phoneBookService from '../src/phonebook'

const Notification = ({ notificationMessage }) => {
  if (!notificationMessage || !notificationMessage.message || !notificationMessage.message.length) {
    return null
  }

  const notificationStyle = {
    color: notificationMessage.error ? 'red' : 'green',
    fontSize: 16,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    maringBottom: 10
  }

  return (
    <div className="error" style={notificationStyle}>
      {notificationMessage.message}
    </div>
  )
}

const Form = (props) => {
  return(
    <form onSubmit={props.addorUpdatePersons}>
        <div>
          name: <input value={props.newName} onChange={props.addNewName} />
        </div>
        <div>
          number:  <input value={props.newNumber} onChange={props.addNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const FilterField = (props) => {
  return(
    <p>
      filter shown with: <input value={props.searchText} onChange={props.setToSearchText} />
    </p>
  )
}

const Results = (props) => {
  return(
    <div>
      {props.persons.map(person => props.persons.length === 0 || (person.name.toUpperCase().includes(props.searchText.toUpperCase()) 
      ? <p key={person.id}>{person.name} {person.number} <button type="submit" onClick={()=> props.handleDelete(person.id)}> delete</button> </p>
      : null))}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchText, setSearchText ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState({})

  const addNewName = (event) => setNewName(event.target.value)
  const addNewNumber = (event) => setNewNumber(event.target.value)
  const setToSearchText = (event) => setSearchText(event.target.value)

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addorUpdatePersons = (event) => {
    event.preventDefault()
    let matchingPerson = persons.filter(person => person.name.toUpperCase() === newName.toUpperCase())
    if(matchingPerson.length)
    {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        const personObj = {
          name: newName,
          number: newNumber,
          id: matchingPerson[0].id
        }
        
        phoneBookService
        .update(matchingPerson[0].id, personObj)
        .then(response => {
          setPersons(persons.map(person => person.id !== matchingPerson[0].id ? person : response))
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== matchingPerson[0].id))
          setNotificationMessage(
            {message: `Information of ${newName} has already been removed from server`, error: true}
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        } )
      }
    }
    else
    {
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      
      phoneBookService
      .add(personObj)
      .then(response => {
        setPersons(persons.concat(response))
      })
    }
    setNotificationMessage(
      {message: `Added ${newName}`, error: false}
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    if(window.confirm(`delete ${persons.filter(person => person.id === id)[0].name} ?`))
    {
      phoneBookService
      .deletePerson(id)
      .then(response => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => setPersons(persons.filter(person => person.id !== id)))
    }  
  }


  return (
   <div>
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} />
      <FilterField searchText={searchText} setToSearchText={setToSearchText} />
      <h3>add a new</h3>
      <Form addNewName={addNewName} addNewNumber={addNewNumber} addorUpdatePersons={addorUpdatePersons} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Results persons={persons} searchText={searchText} handleDelete={deletePerson}/>
  </div>
   </div>
  )
}

export default App