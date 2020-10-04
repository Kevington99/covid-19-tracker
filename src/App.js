import React, { useState, useEffect } from 'react';
import{MenuItem,FormControl,Select, Card, CardContent} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import './App.css';
import {sortData} from "./util";


function App() {
  const [countries, setCountries] = useState([]); // STATE = How to write a variable in REACT [variable, modifier that changes variable]
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({}); //{} makes it an empty object. Specific country pulled
  const [tableData, setTableData] = useState ([]); // [] empty array

useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data);
  });
}, []);

  useEffect(() => {
    // Runs a piece of code based on a given condition
    // Write an internal function
    //curly brackets allow javascript inside html (jsx)

      const getCountriesData = async () => { // async -> send a request to server, wait for it, do something with info
        await fetch ("https://disease.sh/v3/covid-19/countries") // Request URL
        .then((response) => response.json()) // When it comes back get response and just use the json
        .then((data) => { // Then, when we get response as data
          const countries = data.map((country) => ( // .map loops through countries and return an object in a shape
            {
              name: country.country, // Assign name key return United States, United Kingdom
              value: country.countryInfo.iso2 // Assign value key return UK, USA, FR
            }));

            const sortedData = sortData(data)
            setCountries(countries);
            setTableData(sortedData); 
        });
      };

      getCountriesData();  // Calls function
    }, []); // Empty brackets means the code inside will run once (Empty Array)
       
    const onCountryChange = async (event) => {
      const countryCode = event.target.value; //grabs selected value
      //console.log('Yooooooooo', countryCode);

      const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
      // javascript concantinated with string. Use back ticks

      await fetch(url) // Go to url
      .then((response) => response.json()) //turn response into json data tree
      .then((data) => {
        setCountryInfo(data); //store response of country infomation into a variable
        setCountry(countryCode); //updates input field. leaves dropdown as selected option
      }); 
    };

    console.log('COUNTRY INFO >>>', countryInfo);  

  return (
    <div className="app"> 
      <div className="app__left">

        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}> 
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem> // Map through countries and push out value and name as result
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        <Map/>

      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
        </CardContent>

      </Card>
    </div> 
     
  ); 
}

export default App;
