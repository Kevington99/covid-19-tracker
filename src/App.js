import React, { useState, useEffect } from 'react';
import{
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core"
import './App.css';

function App() {
  const [countries, setCountries] = useState([]); // STATE = How to write a variable in REACT [variable, modifier that changes variable]
  const [country, setCountry] = useState('worldwide');
  useEffect(() => {
    // Runs a piece of code based on a given condition
    // Write an internal function
    //curly brackets allow javascript inside html (jsx)

      const getCountriesData = async () => { // async -> send a request to server, wait for it, do something with info
        await fetch ("https://disease.sh/v3/covid-19/countries") // Request URL
        .then((response) => response.json()) // When it comes back get response and just use the json
        .then((data) => { // Then, when we get response as data..
          const countries = data.map((country) => ( // .map loops through countries and return an object in a shape
            {
              name: country.country, // Assign name key return United States, United Kingdom
              value: country.countryInfo.iso2 // Assign value key return UK, USA, FR
            }));

            setCountries(countries); 
        });
      };

      getCountriesData();  // Calls function
    }, []); // Empty brackets means the code inside will run once (Empty Array)
       
    const onCountryChange = async (event) => {
      const countryCode = event.target.value; //grabs selected value
      //console.log('Yooooooooo', countryCode);

      setCountry(countryCode); //leaves dropdown as selected option
    }

  return (
    <div className="app"> 
      <div className="app__header">
        <h1>Covid Tracker WOOOOOO1O</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}> 

            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem> // Map through countries and push out value and name as result
            ))}

          </Select>
        </FormControl>
      </div>
    </div> 
     
  ); 
}

export default App;
