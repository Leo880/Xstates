

import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch countries once
  useEffect(() => {
    //const fetchCountries = async () => {
      /*try {
        const response = await fetch(
          'https://crio-location-selector.onrender.com/countries'
        );
        if (!response.ok) throw new Error('Country API failed');
        const text = await response.text();
        const data = text ? JSON.parse(text) : [];
        setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([]);
      }*/
      
      /*try {
    const response = await fetch(
      'https://crio-location-selector.onrender.com/countries'
    );

    if (!response.ok) {
      throw new Error('Country API failed');
    }

    const text = await response.text();
    let data = [];

    try {
        data = text ? JSON.parse(text) : [];
        } catch (parseErr) {
        console.error('Invalid JSON from country API:', parseErr);
        data = [];
        }

        setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
      console.error('Error fetching countries:', error);
      setCountries([]); // fallback empty list
    }

    }; */

    const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://crio-location-selector.onrender.com/countries"
    );

    if (!response.ok) {
      throw new Error("Country API failed");
    }

    let data = [];
    try {
      data = await response.json();   // ✅ this will throw if body is empty or invalid
    } catch (parseErr) {
      console.error("Invalid JSON from country API:", parseErr);
      data = [];
    }

    setCountries(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching countries:", error);
    setCountries([]); // fallback empty list
  }
};

    fetchCountries();
  }, []);

 


  // Fetch states by country
  const fetchStates = async (country) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      if (!response.ok) throw new Error('State API failed');
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      setStates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching states:', error);
      setStates([]);
    }
  };

  // Fetch cities by state
  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      if (!response.ok) throw new Error('City API failed');
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      setCities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);

    if (country) fetchStates(country);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);

    if (state) fetchCities(selectedCountry, state);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  return (
    <div>
      <select
        id="countryDropdown"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        id="stateDropdown"
        value={selectedState}
        onChange={handleStateChange}
        disabled={!states.length}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        id="cityDropdown"
        value={selectedCity}
        onChange={handleCityChange}
        disabled={!cities.length}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCountry && selectedState && selectedCity && (
        <div id="selectedLocation">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;



/*
const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://crio-location-selector.onrender.com/countries"
    );

    if (!response.ok) {
      throw new Error("Country API failed");
    }

    let data = [];
    try {
      data = await response.json();   // ✅ this will throw if body is empty or invalid
    } catch (parseErr) {
      console.error("Invalid JSON from country API:", parseErr);
      data = [];
    }

    setCountries(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching countries:", error);
    setCountries([]); // fallback empty list
  }
};

*/
