import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from 'antd';
import { onValue, push, ref, remove, serverTimestamp } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import Fileicon from '../assets/imgs/file-icon.jpg';
import '../css/CustomerChat.css';
import { db, storage } from '../firebase/firebase';
import { emojiMap } from './constants';

const CustomerChat = ({ user }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [fileList, setFileList] = useState([]); // State to hold selected files
    const [chatId, setChatId] = useState(`chat_${user.id}`);
    const [isChatActive, setIsChatActive] = useState(true);
    const [downloadURL, setDownloadURL] = useState('');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        setChatId(`${user.firstName} ${user.lastName}`)
        const messagesRef = ref(db, `messages/${chatId}`);

        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const messagesArray = data ? Object.values(data) : [];
            setMessages(messagesArray);
        });

        return () => {
            // Cleanup
        };
    }, [chatId, user.firstName, user.lastName]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, chatId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() || fileList.length > 0) {
            let messageToSend = inputMessage.trim();

            // Convert text emojis to Unicode emojis
            messageToSend = convertTextToEmoji(messageToSend);

            if (fileList.length > 0) {
                try {
                    const file = fileList[0].originFileObj; // Access the original file object

                    if (!file) {
                        throw new Error('File object is undefined or null.');
                    }
                    // Create message object with file URL
                    const newMessage = {
                        message: downloadURL,
                        sender: `${user.firstName} ${user.lastName}`,
                        timestamp: serverTimestamp()
                    };

                    // Push new message to Firebase
                    push(ref(db, `messages/${chatId}`), newMessage);

                    // Clear input fields
                    setInputMessage('');
                    setFileList([]);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    message.error('Failed to upload file.');
                }
            } else {
                // Send text message
                const newMessage = {
                    message: messageToSend,
                    sender: `${user.firstName} ${user.lastName}`,
                    timestamp: serverTimestamp()
                };
                push(ref(db, `messages/${chatId}`), newMessage);

                // Clear input field
                setInputMessage('');
            }
        }
    };

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const closeChat = () => {
        remove(ref(db, `messages/${chatId}`));
        setIsChatActive(false);
        setMessages([]);
        message.success("Close chat success");
    };

    const convertTextToEmoji = (text) => {
        return text.replace(/(:\)|:\(|<3|:D|;\)|:P|:O|:\*|:\||:\/|:B|>:\(|:X|:>|O:\)|:poop:|:fire:|:thumbsup:|:thumbsdown:)/g, (match) => emojiMap[match]);
    };

    const uploadImage = async ({ onError, onSuccess, file }) => {
        try {
            if (!file) {
                throw new Error('File object is undefined or null.');
            }
            const fileStorageRef = storageRef(storage, `files/${file.name}`);
            const snapshot = await uploadBytes(fileStorageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            onSuccess("ok");
            setDownloadURL(downloadURL);
        } catch (error) {
            console.error('Error uploading file:', error);
            message.error("Failed to upload file.");
        }
    };

    const renderMessage = (msg) => {
        if (msg.message.startsWith('https://firebasestorage.googleapis.com')) {
            // Đây là một file đã upload
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
            // This is a regular text message
            return <p>{msg.message}</p>;
        }
    };

    return (
        <div className="chat-background">
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === 'System' ? 'system-message' : (msg.sender === `${user.firstName} ${user.lastName}` ? 'user-message' : 'staff-message')}`}>
                            <span className="sender">{msg.sender}</span>
                            {renderMessage(msg)}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
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
                        <Upload
                            maxCount={1}
                            listType="picture"
                            fileList={fileList}
                            customRequest={uploadImage}
                            onChange={handleFileChange}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        <button type="submit" className="send-button">Send</button>
                        <button type="button" onClick={closeChat} className="close-button">Close Chat</button>
                    </form>
                ) : (
                    <div className="chat-closed">Chat has been closed</div>
                )}
            </div>
        </div>
    );
};

export default CustomerChat;
