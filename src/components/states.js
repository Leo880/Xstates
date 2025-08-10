import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]); // State for countries (fetch this according to your needs)
  const [states, setStates] = useState([]); // State for states
  const [cities, setCities] = useState([]); // State for cities
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch countries when component mounts
    const fetchCountries = async () => {
      // Implement your fetch logic for countries
      
      const response=await fetch('https://crio-location-selector.onrender.com/countries')
      const data=await response.json();
      setCountries(data);

    };
    
    fetchCountries();
  }, []);

  const fetchStates = async (country) => {
    // Fetch states based on selected country
    const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
    const data = await response.json();
    setStates(data);
  };

  const fetchCities = async (country, state) => {
    if (state) {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      const data = await response.json();
      setCities(data);
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setStates([]); // Reset states when country changes
    setCities([]); // Reset cities as well
    fetchStates(country);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    fetchCities(selectedCountry, state);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };
//disabled={!cities.length}
  return (
    <div>
      <select id="countryDropdown" onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select id="stateDropdown" onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select id="cityDropdown" onChange={handleCityChange} >
        <option value="">Select City</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {selectedCity && selectedState && selectedCountry && (
        <div id="selectedLocation">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
