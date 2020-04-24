import React from 'react';
import {Button, Col, Modal, Row, Spin, Typography} from "antd";
import _ from 'lodash';
import Default from "../Layout/Default";
import DeskApiService from "../../Services/DeskApiService";
import {Link} from "react-router-dom";
import DeskForm from "../../Components/DeskForm";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import {notification} from "antd/es";

const { Title } = Typography;

class DashBoard extends Default {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            loading: false,
            desks: [],
            totalDesks: 0,
            isShowModalCreateNewDesk: false
        }
    }

    apiCall = () => {
        this.fetchDesks();
    };

    fetchDesks = () => {
        this.setState({loading: true});
        DeskApiService.list()
            .then(response => {
                this.setState({
                    desks: _.get(response, 'data.data'),
                    totalDesks: _.get(response, 'data.total')
                })
            })
            .finally(() => {
                this.setState({loading: false});
            })
    };

    showModalCreateNewDesk = () => {
        this.setState({
            isShowModalCreateNewDesk: true
        })
    };

    hideModalCreateNewDesk = () => {
        this.setState({
            isShowModalCreateNewDesk: false
        })
    };

    handleCreateNewDesk = (values) => {
        this.setState({loading: true});
        DeskApiService.create(values)
            .then(response => {
                this.hideModalCreateNewDesk();
                this.fetchDesks();
            })
            .finally(() => {
                this.setState({loading: false});
            })
    };

    handleDeleteDesk = (item) => {

        Modal.confirm({
            title: "Are you sure to want to delete this desk",
            onOk: () => {
                this.setState({loading: true});
                DeskApiService.delete(item.id)
                    .then(() => {

                        notification.success({
                            message: `Desk ${_.get(item, 'name', '--')} was deleted`
                        });

                        this.fetchDesks();
                    })
                    .finally(() => {
                        this.setState({loading: false});
                    })
            }
        });
    };

    content = () => {
        const {loading, desks, totalDesks} = this.state;
        return (
            <Spin spinning={loading}>
                <div className={'dashboard'}>
                    <Title className={'dashboard__title'}>
                        <span>Your Desks({totalDesks})</span>
                    </Title>

                    <Button
                        loading={loading}
                        onClick={this.showModalCreateNewDesk}
                        type={'primary'}
                        className={'btn-create-new-desk'}
                    >Create New Desk</Button>

                    <div className="desks">
                        <Row gutter={20}>
                            {Array.isArray(desks) && desks.map(item => (
                                <Col xs={24} sm={12} md={8} lg={6} xlg={4} className={'mg-bt-10'}>
                                    <div
                                        className={'desks__item'}
                                    >
                                        <div className="desks__item__name">{_.get(item, 'name')}</div>
                                        <DeleteOutlined
                                            className={'desks__item__delete'}
                                            onClick={this.handleDeleteDesk.bind(this, item)}
                                        />
                                        <Link
                                            to={`/desks/${_.get(item, 'id')}`}
                                        >
                                            <Button>View</Button>
                                        </Link>
                                        <Link
                                            to={`/desks/${_.get(item, 'id')}/study`}
                                            className={'mg-l-10'}
                                        >
                                            <Button type={'primary'}>Study</Button>
                                        </Link>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                <Modal
                    title="Create new desk"
                    visible={this.state.isShowModalCreateNewDesk}
                    footer={null}
                    destroyOnClose={true}
                    onCancel={this.hideModalCreateNewDesk}
                >
                    <DeskForm
                        onSubmit={this.handleCreateNewDesk}
                    />
                </Modal>
            </Spin>
        )
    }
}

export default DashBoard;