import { getDatabase, onValue, push, ref, serverTimestamp } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import '../../css/StaffChat.css';

const StaffChat = () => {
    const [activeChats, setActiveChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isChatActive, setIsChatActive] = useState(true);

    const db = getDatabase();

    useEffect(() => {
        const chatsRef = ref(db, 'messages');

        onValue(chatsRef, (snapshot) => {
            const data = snapshot.val();
            const chatsArray = data ? Object.keys(data).map(key => ({
                chatId: key,
                ...data[key]
            })) : [];
            setActiveChats(chatsArray);
        });

        return () => {
            // Cleanup
        };
    }, [db]);

    const joinChat = (chatId) => {
        setCurrentChat(chatId);
        const messagesRef = ref(db, `messages/${chatId}`);

        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const messagesArray = data ? Object.values(data) : [];
            setMessages(messagesArray);
        });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() && currentChat && isChatActive) {
            const newMessage = {
                message: inputMessage,
                sender: 'Staff',
                timestamp: serverTimestamp()
            };
            push(ref(db, `messages/${currentChat}`), newMessage);
            setInputMessage('');
        }
    };

    const closeChat = () => {
        setIsChatActive(false);
        // Notify the chat participants that the chat has been closed
    };

    return (
        <div className="staff-chat-container">
            <div className="active-chats-panel">
                <h3 className="panel-title">Active Chats</h3>
                <div className="chat-list">
                    {activeChats.map(chat => (
                        <button
                            key={chat.chatId}
                            onClick={() => joinChat(chat.chatId)}
                            className="chat-button"
                        >
                            <span className="customer-name">{chat.customerName}</span>
                            <span className="message-count">{chat.messageCount}</span>
                        </button>
                    ))}
                </div>
            </div>
            {currentChat && (
                <div className="current-chat-panel">
                    <h3 className="panel-title">Chat with {currentChat}</h3>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === 'System' ? 'system-message' : (msg.sender === 'Staff' ? 'staff-message' : 'customer-message')}`}>
                                <span className="sender">{msg.sender}</span>
                                <p>{msg.message}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage} className="chat-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="message-input"
                        />
                        <button type="submit" className="send-button">Send</button>
                    </form>
                    <button onClick={closeChat} className="close-button">Close Chat</button>
                </div>
            )}
        </div>
    );
};

export default StaffChat;
