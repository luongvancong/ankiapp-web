import React from 'react';
import {Button, Form, Input} from "antd";

class DeskForm extends React.Component {

    render() {
        const {desk} = this.props;
        return (
            <Form
                layout={'vertical'}
                initialValues={desk}
                onFinish={this.props.onSubmit}
            >
                <Form.Item
                    label={'Name'}
                    name={'name'}
                    required={true}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                   <Button htmlType={'submit'} type={'primary'}>Update</Button>
                </Form.Item>
            </Form>
        )
    }
}

DeskForm.defaultProps = {
    desk: {},
    onSubmit: (values) => {}
};

export default DeskForm;