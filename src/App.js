import React, { useState } from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import ChatWindow from './components/ChatWindow';
import DateSelector from './components/DateSelector';

function App() {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log('Selected date:', date); // For debugging
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <WelcomeMessage />
            <DateSelector onDateSelect={handleDateSelect} />
            <ChatWindow selectedDate={selectedDate} />
        </div>
    );
}

export default App;