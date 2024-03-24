import { useState, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const fetchCities = async (inputValue) => {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const data = await response.json();
    return data.data.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = useCallback(async (inputValue) => {
    try {
      const options = await fetchCities(inputValue);
      return { options };
    } catch (error) {
      console.error('Error loading options:', error);
      return { options: [] };
    }
  }, []);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
