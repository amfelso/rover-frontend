import React, { useState, useEffect } from 'react';
import '../styles/DateSelector.css';

function DateSelector({ defaultDate, onDateSelect }) {
    const [date, setDate] = useState(defaultDate);
    const MIN_DATE = "2012-08-06"; // Curiosity landing date

    useEffect(() => {
        setDate(defaultDate);
    }, [defaultDate]);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);
        onDateSelect(selectedDate);
    };

    return (
        <div className="date-selector-container">
            <label htmlFor="date-picker" className="date-selector-label">
                Select an Earth Date:
            </label>
            <input
                id="date-picker"
                type="date"
                value={date}
                min={MIN_DATE} // Restrict date selection before 2012-08-06
                onChange={handleDateChange}
                className="date-selector-input"
            />
        </div>
    );
}

export default DateSelector;