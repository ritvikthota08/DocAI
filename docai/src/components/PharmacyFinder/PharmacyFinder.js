import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './PharmacyFinder.css';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAwyFlKgTbeqdmZ8eNFWh721x4pwGgQiuI'; // Replace with your API key
const SEARCH_RADIUS = 8046.7; // 5 miles in meters

const PharmacyFinder = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const googleMapRef = useRef(null);

  useEffect(() => {
    // Create a div for the map service
    const mapDiv = document.createElement('div');
    mapDiv.style.display = 'none';
    document.body.appendChild(mapDiv);
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googleMapRef.current = new window.google.maps.Map(mapDiv, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12
      });
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) document.head.removeChild(script);
      if (mapDiv.parentNode) document.body.removeChild(mapDiv);
    };
  }, []);

  const findNearbyPharmacies = async (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      if (!googleMapRef.current) {
        reject(new Error('Map not initialized'));
        return;
      }

      const service = new window.google.maps.places.PlacesService(googleMapRef.current);
      const request = {
        location: { lat: latitude, lng: longitude },
        radius: SEARCH_RADIUS,
        type: 'pharmacy'
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(new Error(`Places service failed: ${status}`));
        }
      });
    });
  };

  const getPlaceDetails = async (placeId) => {
    return new Promise((resolve, reject) => {
      if (!googleMapRef.current) {
        reject(new Error('Map not initialized'));
        return;
      }

      const service = new window.google.maps.places.PlacesService(googleMapRef.current);
      service.getDetails(
        { 
          placeId, 
          fields: ['name', 'formatted_address', 'formatted_phone_number', 'opening_hours']
        },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(result);
          } else {
            reject(new Error('Failed to get place details'));
          }
        }
      );
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const geocoder = new window.google.maps.Geocoder();
      const geocodeResult = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: searchQuery }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            resolve(results);
          } else {
            reject(new Error('Could not find this address'));
          }
        });
      });

      const location = geocodeResult[0].geometry.location;
      const userLoc = {
        lat: location.lat(),
        lng: location.lng()
      };

      const pharmacies = await findNearbyPharmacies(userLoc.lat, userLoc.lng);
      
      const pharmacyDetails = await Promise.all(
        pharmacies.slice(0, 10).map(async (pharmacy) => {
          try {
            const details = await getPlaceDetails(pharmacy.place_id);
            return {
              id: pharmacy.place_id,
              name: pharmacy.name,
              address: pharmacy.vicinity,
              phone: details.formatted_phone_number || 'Phone not available',
              hours: details.opening_hours?.weekday_text?.join(', ') || 'Hours not available',
              distance: 'Nearby'
            };
          } catch (error) {
            console.error('Error getting pharmacy details:', error);
            return null;
          }
        })
      );

      const validPharmacies = pharmacyDetails.filter(Boolean);
      setSearchResults(validPharmacies);

    } catch (error) {
      console.error('Search error:', error);
      setError(error.message || 'Failed to search for pharmacies');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <header className="header">
        <div 
          className="logo-container" 
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
        >
          <Bot size={40} className="robot-icon" />
          <span className="logo-text">DocAI</span>
        </div>
        <nav className="top-nav">
          <a href="/faqs">FAQs</a>
          <a href="/contact">contact</a>
        </nav>
      </header>
  
      <h1 className="title">Find Nearby Pharmacies</h1>

      <div className="searchForm">
        <div className="searchContainer">
          <div className="inputWrapper">
            <MapPin className="searchIcon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your address, city, state or zip"
              className="searchInput"
            />
          </div>
          <button
            type="submit"
            className="searchButton"
            onClick={handleSearch}
            disabled={isLoading}
          >
            <Search size={20} />
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="content-area">
        {error && (
          <div className="error">
            {error}
          </div>
        )}
          
        {searchResults.length > 0 && (
          <div className="resultsList">
            {searchResults.map((pharmacy) => (
              <div key={pharmacy.id} className="resultCard">
                <div className="resultContent">
                  <div className="pharmacyDetails">
                    <h3>{pharmacy.name}</h3>
                    <p>{pharmacy.address}</p>
                    <p>{pharmacy.phone}</p>
                    <p className="pharmacyHours">{pharmacy.hours}</p>
                  </div>
                  <div>
                    <span className="distanceBadge">
                      {pharmacy.distance}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchQuery && searchResults.length === 0 && !isLoading && !error && (
          <p className="emptyState">
            No pharmacies found nearby. Try a different search.
          </p>
        )}
      </div>
    </div>
  );
};

export default PharmacyFinder;