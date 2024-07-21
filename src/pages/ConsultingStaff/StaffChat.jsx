import { message } from 'antd';
import { getDatabase, onValue, push, ref, remove, serverTimestamp, update } from 'firebase/database';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Fileicon from '../../assets/imgs/file-icon.jpg';
import { AuthContext } from "../../context/AuthContext";
import '../../css/StaffChat.css';
const StaffChat = () => {
    const { user } = useContext(AuthContext);
    const [activeChats, setActiveChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isChatActive, setIsChatActive] = useState(true);
    const [unreadCounts, setUnreadCounts] = useState({});
    const db = getDatabase();
    const messagesEndRef = useRef(null);
    const location = useLocation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        if (location.state && location.state.openChatId) {
            setCurrentChat(location.state.openChatId);
            setIsChatActive(true);
        }
    }, [location]);

    useEffect(() => {
        const chatsRef = ref(db, 'messages');

        const unsubscribe = onValue(chatsRef, (snapshot) => {
            const data = snapshot.val();
            const newUnreadCounts = {};
            const chatsArray = [];

            if (data) {
                Object.entries(data).forEach(([chatId, chatData]) => {
                    const chat = { chatId, ...chatData };
                    chatsArray.push(chat);

                    const unreadCount = Object.values(chatData).filter(
                        msg => msg.read === true && msg.sender !== `${user.firstName} ${user.lastName}`
                    ).length;
                    newUnreadCounts[chatId] = unreadCount;
                });
            }

            setActiveChats(chatsArray);
            setUnreadCounts(newUnreadCounts);
        });

        return () => unsubscribe();
    }, [db, user]);

    useEffect(() => {
        if (currentChat) {
            const messagesRef = ref(db, `messages/${currentChat}`);

            const unsubscribe = onValue(messagesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const messagesArray = Object.entries(data).map(([key, value]) => ({
                        id: key,
                        ...value
                    }));
                    setMessages(messagesArray);

                    // Đánh dấu tin nhắn mới là đã đọc chỉ khi nó không phải do người dùng hiện tại gửi
                    const updates = {};
                    messagesArray.forEach((message) => {
                        if (message.read === true && message.sender !== `${user.firstName} ${user.lastName}`) {
                            updates[`${message.id}/read`] = false;
                        }
                    });
                    if (Object.keys(updates).length > 0) {
                        update(messagesRef, updates);
                    }

                    // Cập nhật số lượng tin chưa đọc
                    const unreadCount = messagesArray.filter(
                        msg => msg.read === true && msg.sender !== `${user.firstName} ${user.lastName}`
                    ).length;
                    setUnreadCounts(prevCounts => ({
                        ...prevCounts,
                        [currentChat]: unreadCount
                    }));
                }
            });

            return () => unsubscribe();
        }
    }, [currentChat, db, user]);

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
                sender: `${user.firstName} ${user.lastName}`,
                timestamp: serverTimestamp(),
                read: false  // Tin nhắn của người dùng hiện tại không cần đánh dấu là chưa đọc
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
                            {unreadCounts[chat.chatId] > 0 && (
                                <span className="unread-count">{unreadCounts[chat.chatId]}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            {currentChat && (
                <div className="current-chat-panel">
                    <h3 className="panel-title">Chat with {currentChat}</h3>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === 'System' ? 'system-message' : (msg.sender === `${user.firstName} ${user.lastName}` ? 'staff-message' : 'customer-message')}`}>
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
