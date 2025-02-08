import { useState } from 'react'
import {useQuery} from 'react-query'
import './App.css'

const fetches = (location1) => {
  return fetch(`http://api.weatherapi.com/v1/current.json?key=0a2639dce76646488e7213431250601&q=${location1}&aqi=no`).then(res => res.json())
}
function App() {
  const [locationame, setLocationame] = useState('')
  const {isLoading, error, data} = useQuery(['weather-data', locationame], () => fetches(locationame))

  if(isLoading){
    return <div className='bg-blue-100'>
      <input type='text' value={locationame} onChange={(e) => setLocationame(e.target.value)}/>
      <h2>Weather Loading for {locationame}</h2>
    </div>
  }

  if(error){
    console.log("location not found")
    return <div className='App'>
      <input type='text' value={locationame} onChange={(e) => setLocationame(e.target.value)}/>
      <h2>Location not found for {locationame}</h2>
    </div>
  }

  return (
    <div>
      <input placeholder='Enter the location' type='text' value={locationame} onChange={(e) => setLocationame(e.target.value)} />
      {data && data.location && data.current? (
        <div>
          <h2>Location: {data.location.name}, {data.location.region}, {data.location.country}</h2>
          <h2>Temperature in Fahrenheit: {data.current.temp_f}</h2>
          <h2>Temperature in Celsius: {data.current.temp_c}</h2>
          <h2>Current Condition: {data.current.condition.text}</h2>
        </div>
      ) : (
        <h2>No Data</h2>
      )}
    </div>
  );
}

export default App