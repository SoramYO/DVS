import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../css/CustomerChat.css';
const socket = io('https://dvs-be-sooty.vercel.app/socket');

const CustomerChat = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatId, setChatId] = useState(null);
    const [isChatActive, setIsChatActive] = useState(true);

    useEffect(() => {
        socket.emit('initiate_chat', user);

        socket.on('chat_initiated', (data) => {
            setChatId(data.chatId);
            setMessages(prev => [...prev, { sender: 'System', message: data.message }]);
        });

        socket.on('staff_joined', (data) => {
            setMessages(prev => [...prev, { sender: 'System', message: data.message }]);
        });

        socket.on('chat_message', (data) => {
            setMessages(prev => [...prev, data]);
        });

        socket.on('chat_closed', (data) => {
            setMessages(prev => [...prev, { sender: 'System', message: data.message }]);
            setIsChatActive(false);
        });

        return () => {
            socket.off('chat_initiated');
            socket.off('staff_joined');
            socket.off('chat_message');
            socket.off('chat_closed');
        };
    }, [user]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() && chatId && isChatActive) {
            socket.emit('chat_message', { chatId, message: inputMessage, sender: `${user.firstName} ${user.lastName}` });
            setInputMessage('');
        }
    };

    const closeChat = () => {
        if (chatId && isChatActive) {
            socket.emit('close_chat', { chatId, closedBy: `${user.firstName} ${user.lastName}` });
            setIsChatActive(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'System' ? 'system-message' : (msg.sender === `${user.firstName} ${user.lastName}` ? 'user-message' : 'staff-message')}`}>
                        <span className="sender">{msg.sender}</span>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            {isChatActive ? (
                <form onSubmit={sendMessage} className="chat-input">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">Send</button>
                    <button type="button" onClick={closeChat} className="close-button">Close Chat</button>
                </form>
            ) : (
                <div className="chat-closed">Chat has been closed</div>
            )}
        </div>
    );
};

export default CustomerChat;