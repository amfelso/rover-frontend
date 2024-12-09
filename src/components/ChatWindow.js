import React, { useState } from 'react';
import { invokeApi } from './api';

function ChatWindow({ selectedDate }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add the user's message to the chat
        const userMessage = { sender: 'You', text: input };
        setMessages([...messages, userMessage]);

        setInput(''); // Clear input field
        setLoading(true); // Set loading state

        try {
            // Call the API to get Rover's response
            const postBody = {
                user_prompt: input,
                conversation_id: selectedDate,
                earth_date: selectedDate,
            };
            const roverResponse = await invokeApi('POST', '/chat', postBody);

            // Add Rover's response to the chat
            const roverMessage = { sender: 'Rover', text: roverResponse || 'No response from Rover.' };
            setMessages((prevMessages) => [...prevMessages, roverMessage]);
        } catch (error) {
            // Handle API errors
            const errorMessage = { sender: 'System', text: 'Failed to fetch response from Rover. Please try again later.' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            console.error('Error invoking API:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
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
                disabled={loading} // Disable input while loading
            />
            <button onClick={handleSend} style={{ padding: '10px' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
}

export default ChatWindow;