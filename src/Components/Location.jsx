import React, { useState } from 'react'
import axios  from 'axios'
import './location.css'
function Location({setLat,setLong,fetchData}) {
    
    const [sugg,setSugg] = useState(false)
    const [locationSuggestions, setLocationSuggestions] = useState([])
    const [location,setLocation] = useState('')

    const getLocationSuggestions = async (query) => {
        const MAPBOX_API_KEY = "pk.eyJ1IjoiYXN3YW50aHIxODEiLCJhIjoiY2xsN2p4OWphMGduODNlbzZkZ2RoMmhuNyJ9.GiknKP3dpNkzdZyx-ltCUA"
        // import.meta.env.VITE_MAPBOXTOKEN
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
        const params = {
          access_token: MAPBOX_API_KEY,
          types: "place,locality", // Include multiple place types separated by commas
          limit: 4, // Number of suggestions to retrieve
          // country: "IN",
        };
    
        try {
          const response = await axios.get(endpoint, { params });
          return response.data.features;
        } catch (error) {
          // navigate('/error')
          console.error("Error fetching location suggestions:", error);
          return [];
        }
      };

      const handleLocationSuggestion = async (query) => {
        // Get location suggestions when the user types
        if (query != "") {
          const suggestions = await getLocationSuggestions(query);
          setLocationSuggestions(suggestions);
        }
      };
  return (
    <div className="locationMain">
    <label className="">{location.split(',')[0]||'ENTER LOCATION'}</label>
    <div className="inputField">
        <div>
        <input
            type="text"
            onChange={(e) => {
                setSugg(true)
                handleLocationSuggestion(e.target.value);
            }}
            placeholder={'Enter Location'}
            className=""
        />
            
        </div>
        <div className="listDiv">

        <ul className="list">
            {sugg && locationSuggestions.map((suggestion) => (
                <li key={suggestion?.id}>
                    <button
                        type="button"
                        onClick={() => {
                            setSugg(false) 
                            setLocationSuggestions([]);
                            const [long, lat] = suggestion?.geometry.coordinates;
                            setLat(lat)
                            setLong(long)
                            setLocation(suggestion?.place_name)
                        }}
                    >
                        {suggestion.place_name}
                    </button>
                </li>
            ))}
        </ul>
        </div>

    </div>
    <div><button className="search" onClick={fetchData}>SEARCH</button></div>
</div>
  )
}

export default Location