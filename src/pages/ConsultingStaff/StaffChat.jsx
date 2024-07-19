import { message } from 'antd';
import { getDatabase, onValue, push, ref, remove, serverTimestamp } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import Fileicon from '../../assets/imgs/file-icon.jpg';
import '../../css/StaffChat.css';

const StaffChat = () => {
    const [activeChats, setActiveChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isChatActive, setIsChatActive] = useState(true);

    const db = getDatabase();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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
    }, [db]);

    useEffect(() => {
        if (currentChat) {
            const messagesRef = ref(db, `messages/${currentChat}`);

            onValue(messagesRef, (snapshot) => {
                const data = snapshot.val();
                const messagesArray = data ? Object.values(data) : [];
                setMessages(messagesArray);
            });
        }
    }, [currentChat, db]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentChat]);

    const joinChat = (chatId) => {
        setCurrentChat(chatId);
        setIsChatActive(true);
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
        if (currentChat) {
            remove(ref(db, `messages/${currentChat}`));
            setCurrentChat(null);
            setMessages([]);
            setIsChatActive(false);
            message.success("Delete chat success");
        }
    };

    const renderMessage = (msg) => {
        if (msg.message.startsWith('https://firebasestorage.googleapis.com')) {
            const fileName = msg.message.split('/').pop().split('?')[0].split('%2F').pop().split('%20').join(' ').split('%3A').join(':');
            return (
                <div className="file-message">
                    <img src={Fileicon} alt="File" className="file-icon" />
                    <div className="file-info">
                        <span className="file-name">{fileName}</span>
                        <a href={msg.message} target="_blank" rel="noopener noreferrer" className="file-link">
                            View
                        </a>
                    </div>
                </div>
            );
        } else {
            return <p>{msg.message}</p>;
        }
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
                            <span className="customer-name">{chat.chatId}</span>
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
                                {renderMessage(msg)}
                                <div ref={messagesEndRef} />
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
