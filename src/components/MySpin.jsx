import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const MySpin = () => (
    <div style={styles.container}>
        <Spin indicator={antIcon} />
        <Space direction="vertical" size="large">
            <h1 style={styles.loadingText}>Loading...</h1>
            <p style={styles.messageText}>Please wait for a bit ...</p>
        </Space>
    </div>
);

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        padding: '20px',
    },
    loadingText: {
        color: '#1890ff',
        textAlign: 'center',
        fontSize: '2rem',
    },
    messageText: {
        color: '#8c8c8c',
        textAlign: 'center',
        fontSize: '1rem',
    },
};

const mediaQueries = `
    @media (max-width: 768px) {
        .loadingText {
            font-size: 1.5rem;
        }
        .messageText {
            font-size: 0.875rem;
        }
    }

    @media (max-width: 576px) {
        .loadingText {
            font-size: 1.25rem;
        }
        .messageText {
            font-size: 0.75rem;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mediaQueries;
document.head.appendChild(styleSheet);

export default MySpin;
