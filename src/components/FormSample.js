import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    InputNumber,
    Checkbox,
    DatePicker,
    Cascader,
    Radio,
    Select,
    Row,
    Col,
    Upload,
    Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function FormSample() {

    const { Option } = Select;

    const [previewVisible, setpreviewVisible] = useState(false);
    const [previewImage, setpreviewImage] = useState('');
    const [fileList, setfileList] = useState([]);

    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 6 },
    };

    const tailFormItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 4 },
    };

    const locationOptions = [
        {
            value: 'turkey',
            label: 'Turkey',
            children: [
                {
                    value: 'istanbul',
                    label: 'İstanbul',
                    children: [{
                        value: 'besiktas',
                        label: 'Beşiktaş'
                    },
                    {
                        value: 'bakirkoy',
                        label: 'Bakırköy'
                    }]
                },
                {
                    value: 'ankara',
                    label: 'Ankara',
                    children: [{
                        value: 'cankaya',
                        label: 'Çankaya'
                    },
                    {
                        value: 'batikent',
                        label: 'Batıkent'
                    }]
                },
            ]
        },
        {
            value: 'russia',
            label: 'Russia',
            children: [{
                value: 'moscow',
                label: 'Moscow',
                children: []
            },
            {
                value: 'saint-petersburg',
                label: 'Saint Petersburg',
                children: []
            }]
        },
        {
            value: 'japan',
            label: 'Japan',
            children: [{
                value: 'tokyo',
                label: 'Tokyo',
                children: []
            },
            {
                value: 'kyoto',
                label: 'Kyoto',
                children: []
            }]
        }
    ]

    const prefixBefore = (
        <Form.Item name="prefixBefore" noStyle>
            <Select
                className="select-before"
                style={{
                    width: 100,
                }}
            >
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
            </Select>
        </Form.Item>
    );

    const prefixAfter = (
        <Form.Item name="prefixAfter" noStyle>
            <Select
                className="select-before"
                style={{
                    width: 100,
                }}
            >
                <Option value=".com">.com</Option>
                <Option value=".jp">.jp</Option>
                <Option value=".cn">.cn</Option>
                <Option value=".org">.org</Option>
            </Select>
        </Form.Item>
    );

    const languages = [
        {
            name: "English",
            value: "english"
        }, {
            name: "German",
            value: "german"
        }, {
            name: "Spanish",
            value: "spanish"
        }, {
            name: "Chinese",
            value: "chinese"
        },
    ]

    const colors = [
        {
            name: "Red",
            value: "red",
            disabled: false
        },
        {
            name: "Black",
            value: "black",
            disabled: true
        },
        {
            name: "Blue",
            value: "blue",
            disabled: false
        }, {
            name: "Orange",
            value: "orange",
            disabled: false
        }, {
            name: "White",
            value: "white",
            disabled: true
        },
        {
            name: "Purple",
            value: "purple",
            disabled: true
        },
    ]

    const handleCancelimg = () => setpreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setpreviewVisible(true)
        setpreviewImage(file.url || file.preview)
    };

    const handleChange = ({ fileList }) => { setfileList(fileList) };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const filter = (inputValue, path) => {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
    const onFinish = async values => {
        console.log(values);
    }

    return (
        <div className="content-wrapper">
            <h1>Sample Form</h1>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                className="form-center-class"
                initialValues={{
                    prefixBefore: "http://",
                    prefixAfter: ".com"
                }
                }
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'E-mail field is required.',
                        },

                    ]}
                >
                    <Input placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Password field is required.',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    label="Confirm Password"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[{ type: 'number', min: 0, max: 99 }]}>
                    <InputNumber placeholder="Age" />
                </Form.Item>

                <Form.Item
                    name="birth-date"
                    label="Birthdate"
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                >
                    <Radio.Group>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="other">other</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                >
                    <Cascader
                        options={locationOptions}
                        showSearch={{ filter }}
                    />
                </Form.Item>
                <Form.Item
                    name="website"
                    label="Website"
                >
                    <Input
                        addonBefore={prefixBefore}
                        addonAfter={prefixAfter}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="language"
                    label="Languages"
                    rules={[
                        {
                            required: true,
                            message: 'Please select your languages!',
                            type: 'array',
                        },
                    ]}
                >
                    <Select mode="multiple" placeholder="Please select languages">
                        {languages.map(language => {
                            return (
                                <Option key={language.value} value={language.value}>{language.name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>

                <Form.Item name="checkbox-group" label="Colors">
                    <Checkbox.Group>
                        <Row>
                            {colors.map(color => {
                                return (
                                    <Col key={color.value} span={8}>
                                        <Checkbox

                                            value={color.value}
                                            style={{
                                                lineHeight: '32px',
                                            }}
                                            disabled={color.disabled}
                                        >
                                            {color.name}
                                        </Checkbox>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item {...tailFormItemLayout} name="images">
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        customRequest={dummyRequest}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={handleCancelimg}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the agreement
                    </Checkbox>
                </Form.Item>
                <Form.Item   {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Create
                     </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormSample
