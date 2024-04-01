import './App.css';
import  { useState, useEffect } from 'react';

function App() {
  const [countries,setCountries] = useState([]);
  const [searchValue,setSearchValue] = useState("")
  const [filteredCountries,setFilteredCountries] = useState([]);
  
  const getCountriesData = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const res = await data.json();
      console.log(res,"res")
      setCountries(res)
    } catch(e) {
      console.log("Error", e)

    }
  };

  useEffect(() => {
    getCountriesData();
  },[])

  useEffect( () => {
    try {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCountries(filtered);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log( 'No Countries Found', error);
        // set data to an empty array
        setCountries([]);
      } 
    }
  },[searchValue,countries]);

  const handleSearch = e => {
    setSearchValue(e.target.value);
  }

  return (
    <div className="container">
      <div className='searchBox'>
        <input type="text" value={searchValue} onChange={handleSearch}  placeholder="Search for countries..."/>
      </div>
      {filteredCountries.map((country) => ( 
        <div key={country.cca3} className='countryCard'>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className='imageStyle' />
          <h3>{country.name.common}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
