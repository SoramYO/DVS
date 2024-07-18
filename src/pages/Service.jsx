import { Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MySpin from "../components/MySpin";
import '../css/Service.css';

const Service = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchServices = async () => {
            try {
                const response = await axios.get('https://dvs-be-sooty.vercel.app/api/user-service');
                setServices(response.data.services.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);


    if (loading) {
        return <MySpin />
    }

    return (
        <div className="service-container">
            <h1><strong>Our Diamond Valuation Services</strong></h1>
            {services.map((service, index) => (
                <div className="service-section" key={index}>
                    <Card title={service.serviceName} bordered={false} className="service-card">
                        <ul>
                            <li>{service.serviceName}</li>
                            <li>Price: ${service.price}</li>
                            <li>Description: {service.description}</li>
                        </ul>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default Service;
