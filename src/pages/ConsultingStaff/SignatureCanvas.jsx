import { Button, Input, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'; // Import SignatureCanvas

const SignatureModal = ({ visible, onCancel, onSubmit }) => {
    const signatureCanvasRef = useRef(null);
    const [name, setName] = useState('');

    const handleClearSignature = () => {
        if (signatureCanvasRef.current) {
            signatureCanvasRef.current.clear();
        }
    };

    const handleModalSubmit = () => {
        if (signatureCanvasRef.current) {
            const signatureImage = signatureCanvasRef.current.toDataURL('image/png');
            onSubmit(signatureImage, name); // Pass signature image URL or data and name
            onCancel();
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (
        <Modal
            title="Sign Document"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="clear" onClick={handleClearSignature}>
                    Clear
                </Button>,
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleModalSubmit}>
                    Submit
                </Button>,
            ]}
        >
            <SignatureCanvas
                ref={signatureCanvasRef}
                canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}
            />
            <Input
                placeholder="Enter Name"
                value={name}
                onChange={handleNameChange}
                style={{ marginTop: '10px' }}
            />
        </Modal>
    );
};

export default SignatureModal;
