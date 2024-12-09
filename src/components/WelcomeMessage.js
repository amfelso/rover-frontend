import React from 'react';

function WelcomeMessage() {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>👋 Welcome to Your Mars Adventure!</h1>
            <p style={styles.subtitle}>
                🌌 Discover the Red Planet's secrets, chat with the Rover, and experience Mars like never before.
            </p>
            <p style={styles.tagline}>
                🚀 Let curiosity guide you — the universe is waiting!
            </p>
        </header>
    );
}

const styles = {
    header: {
        textAlign: 'center',
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f4f9ff',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '2.5rem',
        color: '#333',
        margin: '0 0 10px',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#555',
        margin: '0 0 10px',
    },
    tagline: {
        fontSize: '1rem',
        color: '#777',
        fontStyle: 'italic',
    },
};

export default WelcomeMessage;