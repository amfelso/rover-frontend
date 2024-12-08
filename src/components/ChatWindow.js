import React, { useState } from 'react';

function ChatWindow({ selectedDate }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add the user's message to the chat
        const userMessage = { sender: 'You', text: input };
        setMessages([...messages, userMessage]);

        try {
            // API Payload
            const payload = {
                earth_date: selectedDate,
                conversation_id: selectedDate,
                user_prompt: input,
            };

            // Call the API (replace `YOUR_API_URL` with the actual endpoint)
            const response = await fetch('YOUR_API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

            // Add the Rover's response to the chat
            const roverMessage = { sender: 'Rover', text: data.response }; // Adjust the key if your API returns something else
            setMessages((prevMessages) => [...prevMessages, roverMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'System', text: 'Error communicating with the Rover. Please try again.' },
            ]);
        }

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