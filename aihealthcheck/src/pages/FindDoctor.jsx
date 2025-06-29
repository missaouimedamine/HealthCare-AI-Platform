import { useState, useEffect } from 'react';
import specialtiesList from '../assets/data/specialities.json';

const FindDoctor = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);
  const [distance, setDistance] = useState('');
  const [pharmacyTime, setPharmacyTime] = useState('day');
  const [isFindEnabled, setIsFindEnabled] = useState(false);
  const [coords, setCoords] = useState(null); // For geolocation

  useEffect(() => {
    setFilteredSpecialties(
      specialtiesList.filter((specialty) =>
        specialty.toLowerCase().includes(searchSpecialty.toLowerCase())
      )
    );
  }, [searchSpecialty]);

  useEffect(() => {
    if (selectedOption === 'doctor') {
      setIsFindEnabled(selectedSpecialty !== '' && distance !== '');
    } else if (selectedOption === 'pharmacy') {
      setIsFindEnabled(distance !== '');
    } else {
      setIsFindEnabled(false);
    }
  }, [selectedOption, selectedSpecialty, distance, pharmacyTime]);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          alert('Location acquired!');
        },
        (error) => {
          alert('Location access denied or unavailable.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleFind = () => {
    if (!isFindEnabled) return;

    let query = '';
    if (selectedOption === 'doctor') {
      query = `${selectedSpecialty} near me within ${distance} km`;
    } else if (selectedOption === 'pharmacy') {
      query = `${pharmacyTime} pharmacy near me within ${distance} km`;
    }

    const encodedQuery = encodeURIComponent(query);
    let mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

    // If coordinates are available, add them
    if (coords) {
      mapsUrl += `&center=${coords.lat},${coords.lng}`;
    }

    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="find-doctor-container">
      <h1>Find Healthcare Provider</h1>
      <p>Select your preferences to find the right provider for you</p>

      {/* Geolocation Button */}
      <div className="geolocate">
        <button onClick={handleGeolocation}>📍 Use My Location</button>
      </div>

      <div className="option-buttons">
        <button
          className={selectedOption === 'doctor' ? 'selected' : ''}
          onClick={() => setSelectedOption('doctor')}
        >
          Doctor
        </button>
        <button
          className={selectedOption === 'pharmacy' ? 'selected' : ''}
          onClick={() => setSelectedOption('pharmacy')}
        >
          Pharmacy
        </button>
      </div>

      {selectedOption === 'doctor' && (
        <div className="selection-section">
          <div className="selection-box">
            <h3>Select Specialty</h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search specialties..."
                value={searchSpecialty}
                onChange={(e) => setSearchSpecialty(e.target.value)}
              />
            </div>
            <div className="scrollable-list">
              <ul className="selection-list">
                {filteredSpecialties.map((specialty) => (
                  <li
                    key={specialty}
                    className={selectedSpecialty === specialty ? 'selected' : ''}
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedOption === 'pharmacy' && (
        <div className="pharmacy-options">
          <h3>Pharmacy Type</h3>
          <select
            value={pharmacyTime}
            onChange={(e) => setPharmacyTime(e.target.value)}
          >
            <option value="day">Day Pharmacy</option>
            <option value="night">Night Pharmacy</option>
          </select>
        </div>
      )}

      {(selectedOption === 'doctor' || selectedOption === 'pharmacy') && (
        <div className="distance-input">
          <h3>Maximum Distance (km)</h3>
          <input
            type="number"
            placeholder="Enter distance in kilometers"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            min="1"
          />
        </div>
      )}

      <button
        className="find-button"
        onClick={handleFind}
        disabled={!isFindEnabled}
      >
        Find {selectedOption === 'doctor' ? 'Doctors' : 'Pharmacies'}
      </button>
    </div>
  );
};

export default FindDoctor;
