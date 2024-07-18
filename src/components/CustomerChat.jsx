import { getDatabase, onValue, push, ref, serverTimestamp } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import '../css/CustomerChat.css';

const CustomerChat = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatId, setChatId] = useState(`chat_${user.id}`);
    const [isChatActive, setIsChatActive] = useState(true);

    const db = getDatabase();

    useEffect(() => {
        const messagesRef = ref(db, `messages/${chatId}`);

        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const messagesArray = data ? Object.values(data) : [];
            setMessages(messagesArray);
        });

        return () => {
            // Cleanup
        };
    }, [chatId, db]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() && isChatActive) {
            const newMessage = {
                message: inputMessage,
                sender: `${user.firstName} ${user.lastName}`,
                timestamp: serverTimestamp()
            };
            push(ref(db, `messages/${chatId}`), newMessage);
            setInputMessage('');
        }
    };

    const closeChat = () => {
        setIsChatActive(false);
        // Notify staff that chat has been closed
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
