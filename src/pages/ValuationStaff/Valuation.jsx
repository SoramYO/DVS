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
import { clarityOptions, colorOptions, countries, cutOptions, fluorescenceOptions, measurementsOptions, polishOptions, proportionsOptions, shapeOptions, symmetryOptions } from '../../components/constants';
const { Option } = Select;
const { Text } = Typography;


const Valuation = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState(null);
    const [form] = Form.useForm();
    const [proportions] = useState('');
    const [measurements] = useState('');
    const [polish] = useState('');
    const [fluorescence] = useState('');
    const [color] = useState('');
    const [cut] = useState('');
    const [clarity] = useState('');
    const [symmetry] = useState('');
    const [shape] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getAllRequests = async () => {
            try {
                const res = await axios.get(`https://dvs-be-sooty.vercel.app/api/requests/${id}`, { withCredentials: true });
                setResults(res.data.request);
                form.setFieldsValue(res.data.request);
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
            // if (proportions.length > 1 || measurements.length > 1 || polish.length > 1 || fluorescence.length > 1 || color.length > 1 || cut.length > 1 || clarity.length > 1 || symmetry.length > 1) {
            //     console.error('Please select only 1 value for each field');
            //     return;
            // }
            await form.validateFields();
            const values = form.getFieldsValue();
            const response = await axios.put(`https://dvs-be-sooty.vercel.app/api/valuation/${id}`, values, { withCredentials: true });
            if (response.data.errCode === 0) {
                message.success(response.data.message);
                valuation();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            console.error('An error occurred while submitting the valuation.');
        }
    };

    const handleFieldChange = (fieldName, value) => {
        form.setFieldsValue({ [fieldName]: value });
    };

    const estimatePrice = async () => {
        try {
            const values = form.getFieldsValue();
            const requiredFields = [
                'proportions', 'diamondOrigin', 'caratWeight', 'measurements',
                'polish', 'fluorescence', 'color', 'cut', 'clarity', 'symmetry', 'shape'
            ];

            const allFilled = requiredFields.every(field => values[field] !== undefined && values[field] !== '');

            if (allFilled) {
                const response = await axios.post('https://dvs-be-sooty.vercel.app/api/estimate-diamond-value', {
                    caratWeight: values.caratWeight,
                    color: values.color,
                    clarity: values.clarity,
                    cut: values.cut,
                    fluorescence: values.fluorescence,
                    origin: values.diamondOrigin,
                    shape: values.shape,
                    polish: values.polish,
                    symmetry: values.symmetry,
                    proportions: values.proportions,
                    measurements: values.measurements
                }, { withCredentials: true });

                form.setFieldsValue({ estimatedPrice: response.data.estimatedPrice });
            } else {
                message.error('Please fill all required fields before estimating the price.');
            }
        } catch (error) {
            console.error('Error estimating price:', error);
            message.error('An error occurred while estimating the price.');
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
                                        value={proportions}
                                        onChange={(value) => handleFieldChange('proportions', value)}
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
                                        onChange={(value) => handleFieldChange('diamondOrigin', value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Carat Weight"
                                    name="caratWeight"
                                    rules={[{ required: true, message: 'Please enter carat weight' }]}
                                >
                                    <Slider
                                        min={0.01}
                                        max={10.99}
                                        step={0.01}
                                        onChange={(value) => handleFieldChange('caratWeight', value)}
                                    />
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
                                        value={measurements}
                                        onChange={(value) => handleFieldChange('measurements', value)}
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
                                        value={polish}
                                        onChange={(value) => handleFieldChange('polish', value)}
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
                                        value={fluorescence}
                                        onChange={(value) => handleFieldChange('fluorescence', value)}
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
                                        value={color}
                                        onChange={(value) => handleFieldChange('color', value)}
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
                                        value={cut}
                                        onChange={(value) => handleFieldChange('cut', value)}
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
                                        value={clarity}
                                        onChange={(value) => handleFieldChange('clarity', value)}
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
                                        value={symmetry}
                                        onChange={(value) => handleFieldChange('symmetry', value)}
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
                                    <Select
                                        placeholder="Select a shape"
                                        showSearch={false}
                                        value={shape}
                                        onChange={(value) => handleFieldChange('shape', value)}
                                    >
                                        {shapeOptions.map(option => (
                                            <Option key={option} value={option}>{option}</Option>
                                        ))}
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
                                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Estimated Price"
                                    name="estimatedPrice"
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" onClick={handleSubmit}>
                                    Submit Valuation
                                </Button>
                                <Button type="default" onClick={estimatePrice} style={{ marginLeft: 8 }}>
                                    Estimate
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