import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Form = (props) => {
  return(
    <form>
      <div>
        name: <input value={props.newSearch} onChange={props.addToNewSearch} />
      </div>
    </form>
  )
}

const Detailed = ({countries, detailed, weather}) => {
  let item=countries[0]
  return (
    <div>
      <h1>{item.name}</h1>
      <div>capital {item.capital} </div>
      <div>population {item.population} </div>
      <h3>Spoken languages</h3>
      <ul>
        {item && item.languages ? item.languages.map(language => <li key={language.iso639_1}>{language.name}</li>) : ''}
      </ul>
      <img src={item.flag} width="100" height="100" alt="" />
      <h3>Weather in {item.capital}</h3>
      <div><b>temperature:</b>{weather && weather.main ? weather.main.temp : ''} celsius</div>
      <div><b>wind:</b>{weather && weather.wind ? weather.wind.speed : ''} m/sec direction {weather && weather.wind ? weather.wind.deg : ''} degrees</div>
    </div>
  )
}

const Item = (props) => {
  return(
    <>
      <div key={props.country.alpha2Code}>{props.country.name}
      <button type="button" onClick={() => props.addToDetailed(props.country)}>show</button>
      </div>
    </>
  )
}

const Results = ({countries, weather, detailed, newSearch, addToDetailed}) => {
  if(newSearch.length !== 0 && countries.length > 10)
  {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(countries.length === 1)
  {
    return <Detailed countries={countries} detailed={detailed} weather={weather}/>
  }

  return(
    <div>
      {countries.map(country => newSearch.length && country.name.toUpperCase().includes(newSearch.toUpperCase()) ? <Item country={country} addToDetailed={addToDetailed} /> : null )}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  const [ detailed, setDetailed ] = useState(-1)
  const [ weather, setWeather ] = useState([])

  const addToDetailed = (country) => {
    setDetailed(countries.indexOf(country))
  }

  const addToNewSearch = (event) => {
    setDetailed(-1)
    setWeather([])
    setNewSearch(event.target.value)
  }

  function getItems () {
    let items = countries.filter(country => country.name.toUpperCase().includes(newSearch.toUpperCase()))
    if(items.length === 1)
      addToDetailed(items[0])
    return items
  } 

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if(detailed !== -1)
    {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${countries[detailed].capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
    }
  }, [detailed, countries])

  return (
   <div>
    <div>
      <h3>add a new</h3>
      <Form addToNewSearch={addToNewSearch} newSearch={newSearch} />
      <h3>Numbers</h3>
      <Results countries={detailed !== -1 ? new Array(countries[detailed]) : getItems() } newSearch={newSearch} addToDetailed={addToDetailed} weather={weather}/>
  </div>
   </div>
  )
}

export default App