import React from 'react';
import {Row,
    Col,
    Rate,
    Form,
    Button,
    Upload,
    Input
} from 'antd';
import { UploadOutlined} from '@ant-design/icons';

const NewMovie = () => {
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };
        const onFinish = (values) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    return (
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row justify='center'>
                    <Col span={12}>


                <Form.Item
                    label="Movie Title"
                    name="movieTitle"
                    rules={[{required: true, message: 'Please input the movie title!'}]}
                    span={3}
                >
                    <Input/>
                </Form.Item>


                <Form.Item
                    label="Author"
                    name="author"
                    rules={[{required: true, message: 'Please input the author!'}]}
                    span={3}
                >
                    <Input/>
                </Form.Item>
                <Form.Item name="rate" label="Rating">
                    <Rate />
                </Form.Item>

                <Form.Item
                    name="Poster"
                    label="Poster"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>

                    </Upload>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                    </Col>
                </Row>
            </Form>
        );

};
export default NewMovie;