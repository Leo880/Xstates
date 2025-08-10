
import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]); // State for countries (fetch this according to your needs)
  const [states, setStates] = useState([]); // State for states
  const [cities, setCities] = useState([]); // State for cities
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

   /*useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');

        if (!response.ok) {
          console.error("Country API failed:", response.status, response.statusText);
          setCountries([]); // fallback empty list
          return;
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : [];
        setCountries(data);

      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]); // fallback on error
      }
    };

    fetchCountries();
  }, []);*/

  useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');

      if (!response.ok) {
        console.error("Country API failed:", response.status, response.statusText);
        setCountries([]); // fallback empty list
        return;
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
        setCountries(Array.isArray(data) ? data : []);

      /*if (text) {
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error("Invalid JSON from country API:", parseError);
          data = [];
        }
      }

      setCountries(data);*/


    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]); // fallback on error
    }
  };

  fetchCountries();
}, []);


  const fetchStates = async (country) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      if (!response.ok) {
        console.error("State API failed:", response.statusText);
        setStates([]);
        return;
      }
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];

    /*if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Invalid JSON from state API:", parseError);
      }
    }*/

    //setStates(data);

    setStates(Array.isArray(data) ? data : []);

  } catch (error) {
    console.error("Error fetching states:", error);
    setStates([]);
  }
};

  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      if (!response.ok) {
        console.error("City API failed:", response.statusText);
        setCities([]);
        return;
      }
       const text = await response.text();
       const data = text ? JSON.parse(text) : [];

    /*if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Invalid JSON from city API:", parseError);
      }
    }
      
    setCities(data); */
       setCities(Array.isArray(data) ? data : []);

  } catch (error) {
    console.error("Error fetching cities:", error);
    setCities([]);
  }
};

  const handleCountryChange = (e) => {
  const country = e.target.value;
  setSelectedCountry(country);
  setStates([]);
  setCities([]);

  // Don't fetch states if no valid country is selected
  if (!country) return;

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
