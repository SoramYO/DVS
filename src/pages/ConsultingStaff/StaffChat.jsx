import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../../context/AuthContext';
import '../../css/StaffChat.css';
const socket = io('https://dvs-be-sooty.vercel.app');

const StaffChat = () => {
    const [activeChats, setActiveChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const { user } = useContext(AuthContext);
    var staffUser = user;

    useEffect(() => {
        socket.emit('join_staff_room', staffUser);

        socket.on('active_chats', (chats) => {
            setActiveChats(chats);
        });

        socket.on('new_chat_request', (data) => {
            setActiveChats(prev => {
                if (!prev.some(chat => chat.chatId === data.chatId)) {
                    return [...prev, { ...data, messageCount: 0 }];
                }
                return prev;
            });
        });

        socket.on('staff_joined', (data) => {
            if (currentChat) {
                setMessages(prev => [...prev, { sender: 'System', message: data.message }]);
            }
        });

        socket.on('chat_message', (data) => {
            if (currentChat) {
                setMessages(prev => [...prev, data]);
            }
        });

        socket.on('chat_history', (data) => {
            if (data.chatId === currentChat) {
                setMessages(data.messages);
            }
        });

        socket.on('update_message_count', (data) => {
            setActiveChats(prev => prev.map(chat =>
                chat.chatId === data.chatId ? { ...chat, messageCount: data.count } : chat
            ));
        });

        socket.on('chat_ended', (data) => {
            setActiveChats(prev => prev.filter(chat => chat.chatId !== data.chatId));
            if (currentChat === data.chatId) {
                setCurrentChat(null);
                setMessages([]);
            }
        });
        socket.on('chat_closed', (data) => {
            setActiveChats(prev => prev.filter(chat => chat.chatId !== data.chatId));
            if (currentChat === data.chatId) {
                setCurrentChat(null);
                setMessages(prev => [...prev, { sender: 'System', message: data.message }]);
            }
        });

        return () => {
            socket.off('active_chats');
            socket.off('new_chat_request');
            socket.off('staff_joined');
            socket.off('chat_message');
            socket.off('chat_history');
            socket.off('update_message_count');
            socket.off('chat_ended');
            socket.off('chat_closed');
        };
    }, [staffUser, currentChat]);

    const joinChat = (chatId) => {
        setCurrentChat(chatId);
        setMessages([]);
        socket.emit('staff_join', { staffData: staffUser, chatId });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() && currentChat) {
            const messageData = {
                chatId: currentChat,
                message: inputMessage,
                sender: `Staff ${staffUser.firstName}`
            };
            socket.emit('chat_message', messageData);
            setInputMessage('');
        }
    };
    const closeChat = () => {
        if (currentChat) {
            socket.emit('close_chat', { chatId: currentChat, closedBy: `Staff ${staffUser.firstName}` });
            setCurrentChat(null);
            setMessages([]);
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
                            <div key={index} className={`message ${msg.sender === 'System' ? 'system-message' : (msg.sender === currentChat ? 'customer-message' : 'staff-message')}`}>
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