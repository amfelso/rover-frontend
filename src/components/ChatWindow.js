import React, { useState } from 'react';

function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add the user's message to the chat
        const userMessage = { sender: 'You', text: input };
        setMessages([...messages, userMessage]);

        // Mock response for now; replace this with boto3 API connection later
        const roverResponse = { sender: 'Rover', text: 'Hello from Mars!' };
        setMessages([...messages, userMessage, roverResponse]);

        setInput(''); // Clear input field
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ margin: '10px 0' }}>
                        <strong>{msg.sender}:</strong> <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ width: '80%', padding: '10px', marginRight: '10px' }}
            />
            <button onClick={handleSend} style={{ padding: '10px' }}>Send</button>
        </div>
    );
}

export default ChatWindow;