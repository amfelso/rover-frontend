import React, { useState, useEffect } from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import ChatWindow from './components/ChatWindow';
import DateSelector from './components/DateSelector';
import { handleSignOut } from './auth';
import { fetchDefaultSimulationDate } from './components/api'; // Import the function to fetch the default date
import './App.css';

function App() {
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const initializeDate = async () => {
            const defaultDate = await fetchDefaultSimulationDate();
            setSelectedDate(defaultDate);
        };
        initializeDate();
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log('Selected date:', date); // For debugging
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <WelcomeMessage />
            <DateSelector defaultDate={selectedDate} onDateSelect={handleDateSelect} />
            <ChatWindow selectedDate={selectedDate} />
            {/* Logout Button */}
            <button onClick={handleSignOut} className="logout-button">
                Logout
            </button>
        </div>
    );
}

export default App;