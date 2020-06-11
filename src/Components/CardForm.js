import React from 'react';
import {Button, Form, Input, Upload} from "antd";
import {
    UploadOutlined
} from '@ant-design/icons';
import FormEditorInput from "./FormEditorInput";

class CardForm extends React.Component {

    handleBeforeUpload = (field, file) => {

        return false;
    };

    render() {
        const {loading} = this.props;
        return (
            <Form layout={'vertical'} onFinish={this.props.onSubmit}>
                <Form.Item
                    label={'Front'}
                    name={'front'}
                    required={true}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={'Back'}
                    name={'back'}
                    required={true}
                >
                    <FormEditorInput />
                </Form.Item>

                <Form.Item
                    label={'Example'}
                    name={'example'}
                    required={true}
                >
                    <FormEditorInput />
                </Form.Item>

                <Form.Item
                    label={'Audio'}
                    name={'audio'}
                >
                    <Upload
                        beforeUpload={this.handleBeforeUpload.bind(this, 'audio')}
                    >
                        <Button>
                            <UploadOutlined /> Upload audio
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label={'Picture'}
                    name={'image'}
                >
                    <Upload
                        beforeUpload={this.handleBeforeUpload.bind(this, 'image')}
                    >
                        <Button>
                            <UploadOutlined /> Upload picture
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        loading={loading}
                        htmlType={'submit'}
                        type={'primary'}>Update</Button>
                </Form.Item>
            </Form>
        )
    }
}

CardForm.defaultProps = {
    card: {},
    loading: false,
    onSubmit: (values) => {}
};

export default CardForm;