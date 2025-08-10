import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // helper to safely parse JSON
  const safeParse = async (response) => {
    const text = await response.text();
    if (!text) return [];
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON:", err);
      return [];
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        if (!response.ok) {
          console.error("Country API failed:", response.status, response.statusText);
          setCountries([]);
          return;
        }
        const data = await safeParse(response);
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
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
      const data = await safeParse(response);
      setStates(data);
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
      const data = await safeParse(response);
      setCities(data);
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
    if (country) fetchStates(country);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setCities([]);
    if (state) fetchCities(selectedCountry, state);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

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

      <select id="cityDropdown" onChange={handleCityChange}>
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
