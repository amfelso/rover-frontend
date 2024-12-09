import React, { useState, useEffect } from "react";
import { fetchDefaultSimulationDate } from "./api";

function DateSelector({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchDate = async () => {
      const defaultDate = await fetchDefaultSimulationDate();
      setSelectedDate(defaultDate);
      if (onDateChange) {
        onDateChange(defaultDate);
      }
    };

    fetchDate();
  }, [onDateChange]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <div>
      <label htmlFor="date-picker">Select Simulation Date:</label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DateSelector;