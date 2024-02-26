import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle = {
    display: "flex",
    flexDirection: "column", // Change to column layout
    alignItems: "center",
    height: "100vh",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "200px",
  };

  return (
    <div style={containerStyle}>
      {/* Search bar at the top */}
      <input
        type="text"
        placeholder="Search for countries.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* Separate section for displaying country cards */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredCountries.map((item) => (
          <div key={item.cca3} style={cardStyle} className="countryCard">
            <img
              src={item.flags.png}
              alt={`Flag of ${item.name.common}`}
              style={{ width: "100px", height: "100px" }}
              width="100"
              height="100"
            />
            <h2>{item.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
