import { useEffect, useState } from "react";

export const useSearch = (bookings) => {
  const [searchBooking, setSearchBooking] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchBooking(e.target.value);
  };
  useEffect(() => {
    const results = bookings.filter((person) =>
      person.full_name.toLowerCase().includes(searchBooking.toLowerCase())
    );
    setSearchResults(results);
  }, [bookings, searchBooking]);

  return {
    searchResults,
    searchBooking,
    handleChange,
  };
};
