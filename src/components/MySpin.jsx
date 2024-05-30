import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const MySpin = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Spin indicator={antIcon} />
        <Space direction="vertical" size="large">
            <h1 style={{ color: '#1890ff', textAlign: 'center' }}>Loading...</h1>
            <p style={{ color: '#8c8c8c', textAlign: 'center' }}>Please wait for a bit ...</p>
        </Space>
    </div>
);

export default MySpin;