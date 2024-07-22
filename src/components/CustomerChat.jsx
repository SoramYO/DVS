import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from 'antd';
import { onValue, push, ref, remove, serverTimestamp } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import Fileicon from '../assets/imgs/file-icon.jpg';
import '../css/CustomerChat.css';
import { db, storage } from '../firebase/firebase';
import { emojiMap } from './constants';

const CustomerChat = ({ user }) => {
    const chatId = `${user.id} ${user.firstName} ${user.lastName}`;
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [fileList, setFileList] = useState([]); // State to hold selected files
    const [isChatActive, setIsChatActive] = useState(true);
    const [downloadURL, setDownloadURL] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const showDeleteConfirm = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        remove(ref(db, `messages/${chatId}`));
        setIsChatActive(false);
        setMessages([]);
        setIsModalVisible(false);
        message.success("Chat deleted successfully");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const messagesRef = ref(db, `messages/${chatId}`);

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messagesArray = Object.entries(data).map(([key, value]) => ({
                    ...value,
                    id: key
                }));
                setMessages(messagesArray);
            } else {
                setMessages([]);
            }
        });

        return () => unsubscribe();
    }, [chatId]);

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
                    const file = fileList[0].originFileObj;

                    if (!file) {
                        throw new Error('File object is undefined or null.');
                    }
                    // Create message object with file URL
                    const newMessage = {
                        message: downloadURL,
                        sender: `${user.firstName} ${user.lastName}`,
                        timestamp: serverTimestamp(),
                        read: true
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
                    timestamp: serverTimestamp(),
                    read: true
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
                        <div key={index} className={`message ${msg.sender === 'System' ? 'system-message' : (msg.sender === `${user.firstName} ${user.lastName}` ? 'customer-message1' : 'staff-message1')}`}>
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
                        <button type="button" onClick={showDeleteConfirm} className="close-button">Delete Chat</button>
                    </form>
                ) : (
                    <div className="chat-closed">Chat has been closed</div>
                )}
            </div>
            <Modal
                title="Confirm Delete"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to delete this chat?</p>
            </Modal>
        </div>

    );
};

export default CustomerChat;
