import React, { useState, useEffect } from 'react';

function DateSelector({ defaultDate, onDateSelect }) {
    const [date, setDate] = useState(defaultDate);

    useEffect(() => {
        setDate(defaultDate);
    }, [defaultDate]);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);
        onDateSelect(selectedDate);
    };

    return (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <label htmlFor="date-picker">Select an Earth Date: </label>
            <input
                id="date-picker"
                type="date"
                value={date}
                onChange={handleDateChange}
                style={{ padding: '5px' }}
            />
        </div>
    );
}

export default DateSelector;