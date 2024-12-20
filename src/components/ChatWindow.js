import React, { useState, useEffect, useRef } from 'react';
import { invokeApi } from '../utils/api';
import { calculateSol } from "../utils/date";
import '../styles/ChatWindow.css'; // External CSS for better styling

// Header Component
const ChatHeader = ({ date }) => (
    <div className="chat-header">
        <h2>💬 Engage with Curiosity</h2>
        <p>
            Sol {date.sol} | Earth Date: {date.earthDate}
        </p>
        <p>Ask me about Mars' geology, my findings, or the data I've collected.</p>
    </div>
);

function ChatWindow({ selectedDate }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const handleSend = async (retryInput = '') => {
        const messageToSend = (retryInput || input).trim();
        if (!messageToSend) return;

        // Add the user's message to the chat
        const userMessage = { sender: 'You', text: '🌍 ' + messageToSend };
        setMessages([...messages, userMessage]);

        setInput(''); // Clear input field
        setLoading(true); // Set loading state

        try {
            // Simulate a 429 or 504 error for testing
            // Uncomment the specific error to test its behavior

            // Simulate 429: OpenAI credit limit exceeded
            // throw { response: { status: 429 } };

            // Simulate 504: Gateway Timeout error
            // throw { response: { status: 504 } };

            // Simulate unexpected error
            // throw new Error('Unexpected error for testing');

            // Call the API to get Rover's response
            const postBody = {
                user_prompt: messageToSend,
                conversation_id: selectedDate,
                earth_date: selectedDate,
            };
            const response = await invokeApi('POST', '/chat', postBody);
            const roverResponse = await response.text();

            // Add Rover's response to the chat
            const roverMessage = { sender: 'Rover', text: '🤖 ' + roverResponse || '🤖 ...' };
            setMessages((prevMessages) => [...prevMessages, roverMessage]);
        } catch (error) {
            // Check error status codes
            let errorMessage;
            if (error.response && error.response.status === 429) {
                errorMessage = {
                    sender: 'Mission Control',
                    text: `🌌 Space travel is expensive! You've hit your OpenAI credit limit. Please pay for more credits so we can keep exploring the Red Planet!`,
                    retry: true, // Enable retry
                    input: messageToSend
                };
            } else if (error.response && error.response.status === 504) {
                errorMessage = {
                    sender: 'Mission Control',
                    text: `🛰️ Hmm, it seems your message got lost on its long journey from Mars. Mars is really far away! Please try again.`,
                    retry: true, // Enable retry
                    input: messageToSend
                };
            } else {
                errorMessage = {
                    sender: 'Mission Control',
                    text: "🌪️ A Martian dust storm seems to be disrupting communications. Let's wait for the skies to clear and try again soon!",
                };
            }
    
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            console.error('Error invoking API:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !loading) {
            handleSend();
        }
    };

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chat-window">
            {/* Add Header */}
            <ChatHeader date={{ sol: calculateSol(selectedDate) || 0, earthDate: selectedDate || '2012-08-06' }} />

            {/* Chat Messages */}
            <div className="chat-messages" ref={messagesContainerRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender === 'You' ? 'user' : 'rover'}`}>
                        <div className="message-sender">{msg.sender}:</div>
                        <div className="message-text">{msg.text}</div>
                        {/* Retry Button */}
                        {msg.retry && (
                            <button
                                className="retry-button"
                                onClick={() => handleSend(msg.input)} // Retry with the original input
                            >
                                Retry
                            </button>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input and Send Button */}
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="chat-input"
                    disabled={loading}
                />
                <button onClick={() => handleSend()} className="chat-send-button" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;