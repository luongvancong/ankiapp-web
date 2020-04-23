import React, {Component} from 'react';
import _ from 'lodash';
import Default from "../../Layout/Default";
import DeskApiService from "../../../Services/DeskApiService";
import {Button, Modal, Table} from "antd";
import CardForm from "../../../Components/CardForm";
import CardApiService from "../../../Services/CardApiService";
import {notification} from "antd/es";
import {Link} from "react-router-dom";
import EditOutlined from "@ant-design/icons/es/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";

class DeskDetail extends Default {

    componentDidMount() {
        super.componentDidMount();
        this.fetchCards();
    }

    getId = () => {
        return this.props.match.params.id;
    };

    fetchCards = () => {
        this.setState({loading: true});
        DeskApiService.getCards(this.getId())
            .then(response => {
                const responseData = _.get(response, 'data');
                this.setState({
                    cards: _.get(responseData, 'data'),
                    cardPagination: _.omit(responseData, 'data'),
                });
            })
            .finally(() => {
                this.setState({loading: false});
            })
    };

    getColumns = () => {
        return [
            {
                title: "Front",
                key: 'front',
                dataIndex: 'front'
            },
            {
                title: "Back",
                key: "back",
                dataIndex: 'back'
            },
            {
                title: "Example",
                key: 'example',
                dataIndex: 'example'
            },
            {
                title: "Actions",
                key: 'action',
                render: (text, record) => {
                    return (
                        <>
                            <EditOutlined className={'pointer mg-r-10'} />
                            <DeleteOutlined className={'pointer text-danger text-danger--important'} />
                        </>
                    )
                }
            }
        ];
    };

    showModalCreateNewCard = () => {
        this.setState({
            isShowModalCreateNewCard: true
        })
    };

    hideModalCreateNewCard = () => {
        this.setState({
            isShowModalCreateNewCard: false
        })
    };

    handleCreateNewCard = (values) => {
        this.setState({loading: true});
        const data = {
            ..._.omit(values, 'audio', 'image'),
            desk_id: this.getId(),
            audio: _.get(values, 'audio.file'),
            image: _.get(values, 'image.file')
        };

        const formData = new FormData();
        _.forEach(data, (value, key) => {
            formData.append(key, value);
        });

        CardApiService.create(formData)
            .then(response => {
                this.fetchCards();
                this.hideModalCreateNewCard();
                notification.success({
                    message: "Create new card success"
                });
            })
            .finally(() => {
                this.setState({loading: false});
            })
    };

    content = () => {
        const {cardPagination} = this.state;
        return (
            <div className="desk-detail">
                <div className={'clearfix mg-bt-10 mg-t-10'}>
                    <h1 className={'float-left'}>Desk Detail</h1>
                    <div className="float-right">
                        <Button
                            type={'default'}
                            className={'mg-r-10'}
                            onClick={this.showModalCreateNewCard}
                        >
                            Create New Card
                        </Button>
                        <Button
                            type={'primary'}
                        >
                            <Link to={`/desks/${this.getId()}/study`}>Study</Link>
                        </Button>
                    </div>
                </div>

                <Table
                    columns={this.getColumns()}
                    dataSource={this.state.cards}
                    pagination={{
                        current: _.get(cardPagination, 'current_page'),
                        total: _.get(cardPagination, 'total'),
                        pageSize: _.get(cardPagination, 'per_page')
                    }}
                />

                <Modal
                    title={'Create new card'}
                    footer={null}
                    visible={this.state.isShowModalCreateNewCard}
                    onCancel={this.hideModalCreateNewCard}
                >
                    <CardForm
                        onSubmit={this.handleCreateNewCard}
                    />
                </Modal>
            </div>
        )
    }
}

export default DeskDetail;