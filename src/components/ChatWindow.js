import React, { useState } from 'react';
import { invokeApi } from '../utils/api';
import { calculateSol } from "../utils/date";
import '../styles/ChatWindow.css'; // External CSS for better styling

// Header Component
const ChatHeader = ({ date }) => (
    <div className="chat-header">
        <h2>💬 Talk to Curiosity</h2>
        <p>
            Sol {date.sol} | Earth Date: {date.earthDate}
        </p>
        <p>Ask me about what I’ve seen, Mars, or anything you’re curious about!</p>
    </div>
);

function ChatWindow({ selectedDate }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

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
            const response = await invokeApi('POST', '/chat', postBody);
            const roverResponse = await response.text();

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
        <div className="chat-window">
            {/* Add Header */}
            <ChatHeader date={{ sol: calculateSol(selectedDate) || 0, earthDate: selectedDate || '2012-08-06' }} />

            {/* Chat Messages */}
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender === 'You' ? 'user' : 'rover'}`}>
                        <div className="message-sender">{msg.sender}:</div>
                        <div className="message-text">{msg.text}</div>
                    </div>
                ))}
            </div>

            {/* Input and Send Button */}
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input"
                    disabled={loading}
                />
                <button onClick={handleSend} className="chat-send-button" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;