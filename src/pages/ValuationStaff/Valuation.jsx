import {
    AutoComplete,
    Button,
    Card,
    Col,
    Form,
    Image,
    InputNumber,
    Row,
    Select,
    Slider,
    Spin,
    Typography,
    message
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { clarityOptions, colorOptions, countries, cutOptions, fluorescenceOptions, measurementsOptions, polishOptions, proportionsOptions, symmetryOptions } from '../../components/constants';
const { Option } = Select;
const { Text } = Typography;


function Valuation() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState(null);
    const [form] = Form.useForm();
    const [proportions, setProportions] = useState('');
    const [measurements, setMeasurements] = useState('');
    const [polish, setPolish] = useState('');
    const [fluorescence, setFluorescence] = useState('');
    const [color, setColor] = useState('');
    const [cut, setCut] = useState('');
    const [clarity, setClarity] = useState('');
    const [symmetry, setSymmetry] = useState('');




    const handleChangeProportions = (value) => {
        setProportions(value);
    };

    const handleChangeMeasurements = (value) => {
        setMeasurements(value);
    };
    const handleChangePolish = (value) => {
        setPolish(value);
    };
    const handleChangeFluorescence = (value) => {
        setFluorescence(value);
    };
    const handleChangeColor = (value) => {
        setColor(value);
    };
    const handleChangeCut = (value) => {
        setCut(value);
    };
    const handleChangeClarity = (value) => {
        setClarity(value);
    };
    const handleChangeSymmetry = (value) => {
        setSymmetry(value);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const getAllRequests = async () => {
            try {
                const res = await axios.get(`https://dvs-be-sooty.vercel.app/api/requests/${id}`, { withCredentials: true });
                setResults(res.data.request[0]);
                form.setFieldsValue(res.data.request[0]);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getAllRequests();
    }, [form, id]);

    const valuation = () => {
        navigate(`/valuationStaff/takedRequest`);
    };

    const handleSubmit = async () => {
        try {
            //check nếu các trường là màng thì thông báo chỉ được chọn 1 giá trị
            if (proportions.length > 1 || measurements.length > 1 || polish.length > 1 || fluorescence.length > 1 || color.length > 1 || cut.length > 1 || clarity.length > 1 || symmetry.length > 1) {
                message.error('Please select only 1 value for each field');
                return;
            }
            await form.validateFields();
            const values = form.getFieldsValue();
            message.success('Submit valuation successfully');
            const response = await axios.put(`https://dvs-be-sooty.vercel.app/api/valuation/${id}`, values, { withCredentials: true });
            if (response.data.errCode === 0) {
                message.success(response.data.message);
                valuation();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            message.error('An error occurred while submitting the valuation.');
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <Spin size="large" />
            </div>
        );
    }

    if (!results) {
        return <div>No request found</div>;
    }

    return (
        <Row gutter={[24, 24]}>
            <Col span={12}>
                <Card title="Request Information" bordered={false} style={{ marginTop: 24 }}>
                    <div className="info-item">
                        <Text strong>Service Type:</Text> {results.serviceName}
                    </div>
                    <div className="info-item">
                        <Text strong>Note:</Text> {results.note}
                    </div>
                </Card>
                <Card title="Diamond Image" bordered={false}>
                    <Image
                        src={results.requestImage}
                        alt="Diamond"
                        placeholder={<Image preview={false} src={results.requestImage} alt="Diamond" />}
                    />
                </Card>
            </Col>

            <Col span={12}>
                <Card className="header-solid h-full" bordered={false} title={<h3 className="font-semibold m-0">Diamond Information</h3>} bodyStyle={{ paddingTop: '0' }}>
                    <Form form={form} layout="vertical">
                        <Row gutter={[24, 24]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Proportions"
                                    name="proportions"
                                    rules={[{ required: true, message: 'Please enter proportions' }]}
                                >
                                    <Select
                                        placeholder="Select or enter proportions"
                                        showSearch={false}
                                        mode="tags"
                                        value={proportions}
                                        onChange={handleChangeProportions}
                                        allowClear
                                    >
                                        {proportionsOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
                                    </Select>

                                </Form.Item>

                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Diamond Origin"
                                    name="diamondOrigin"
                                    rules={[{ required: true, message: 'Please enter diamond origin' }]}
                                >
                                    <AutoComplete
                                        placeholder="Select or enter diamond origin"
                                        options={countries.map(country => ({ value: country }))}
                                        filterOption={(inputValue, option) =>
                                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Carat Weight"
                                    name="caratWeight"
                                    rules={[{ required: true, message: 'Please enter carat weight' }]}
                                >
                                    <Slider min={0.01} max={10.99} step={0.01} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Measurements"
                                    name="measurements"
                                    rules={[{ required: true, message: 'Please enter measurements' }]}
                                >
                                    <Select
                                        placeholder="Select or enter measurements"
                                        showSearch={false}
                                        mode="tags"
                                        value={measurements}
                                        onChange={handleChangeMeasurements}
                                        allowClear
                                    >
                                        {measurementsOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Polish"
                                    name="polish"
                                    rules={[{ required: true, message: 'Please enter polish' }]}
                                >
                                    <Select
                                        placeholder="Select or enter polish"
                                        showSearch={false}
                                        mode="tags"
                                        value={polish}
                                        onChange={handleChangePolish}
                                        allowClear
                                    >
                                        {polishOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Fluorescence"
                                    name="fluorescence"
                                    rules={[{ required: true, message: 'Please enter fluorescence' }]}
                                >
                                    <Select
                                        placeholder="Select or enter fluorescence"
                                        showSearch={false}
                                        mode="tags"
                                        value={fluorescence}
                                        onChange={handleChangeFluorescence}
                                        allowClear
                                    >
                                        {fluorescenceOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Color"
                                    name="color"
                                    rules={[{ required: true, message: 'Please enter color' }]}
                                >
                                    <Select
                                        placeholder="Select or enter color"
                                        showSearch={false}
                                        mode="tags"
                                        value={color}
                                        onChange={handleChangeColor}
                                        allowClear
                                    >
                                        {colorOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Cut"
                                    name="cut"
                                    rules={[{ required: true, message: 'Please enter cut' }]}
                                >
                                    <Select
                                        placeholder="Select or enter cut"
                                        showSearch={false}
                                        mode="tags"
                                        value={cut}
                                        onChange={handleChangeCut}
                                        allowClear
                                    >
                                        {cutOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Clarity"
                                    name="clarity"
                                    rules={[{ required: true, message: 'Please enter clarity' }]}
                                >
                                    <Select
                                        placeholder="Select or enter clarity"
                                        showSearch={false}
                                        mode="tags"
                                        value={clarity}
                                        onChange={handleChangeClarity}
                                        allowClear
                                    >
                                        {clarityOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Symmetry"
                                    name="symmetry"
                                    rules={[{ required: true, message: 'Please enter symmetry' }]}
                                >
                                    <Select
                                        placeholder="Select or enter symmetry"
                                        showSearch={false}
                                        mode="tags"
                                        value={symmetry}
                                        onChange={handleChangeSymmetry}
                                        allowClear
                                    >
                                        {symmetryOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Shape"
                                    name="shape"
                                    rules={[{ required: true, message: 'Please select a shape' }]}
                                >
                                    <Select placeholder="Select a shape">
                                        <Option value="Round">Round</Option>
                                        <Option value="Princess">Princess</Option>
                                        <Option value="Emerald">Emerald</Option>
                                        <Option value="Cushion">Cushion</Option>
                                        <Option value="Radiant">Radiant</Option>
                                        <Option value="Asscher">Asscher</Option>
                                        <Option value="Heart">Heart</Option>
                                        <Option value="Trilliant">Trilliant</Option>
                                        <Option value="Oval">Oval</Option>
                                        <Option value="Pear">Pear</Option>
                                        <Option value="Marquise">Marquise</Option>
                                        <Option value="Baguette">Baguette</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[{ required: true, message: 'Please enter price' }]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // Format input as currency
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')} // Parse value into a number
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" onClick={handleSubmit}>
                                    Submit Valuation
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default Valuation;