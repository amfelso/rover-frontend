import React, { useState } from 'react';

function DateSelector({ onDateSelect }) {
    const [date, setDate] = useState('');

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        onDateSelect(selectedDate); // Notify parent
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