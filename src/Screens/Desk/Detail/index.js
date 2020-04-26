import React from 'react';
import _ from 'lodash';
import Default from "../../Layout/Default";
import DeskApiService from "../../../Services/DeskApiService";
import {Button, Input, Modal, Spin, Table} from "antd";
import CardForm from "../../../Components/CardForm";
import CardApiService from "../../../Services/CardApiService";
import {notification} from "antd/es";
import {Link} from "react-router-dom";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import EditOutlined from "@ant-design/icons/es/icons/EditOutlined";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";

class DeskDetail extends Default {


    componentDidMount() {
        super.componentDidMount();
        this.fetchDesk();
        this.fetchCards();
    }

    getId = () => {
        return this.props.match.params.id;
    };

    fetchDesk = () => {
        this.setState({loading: true});
        DeskApiService.getById(this.getId())
            .then(response => {
                this.setState({
                    desk: _.get(response, 'data')
                });
            })
            .finally(() => {
                this.setState({loading: false});
            })
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
                dataIndex: 'front',
                width: 200,
            },
            {
                title: "Back",
                key: "back",
                dataIndex: 'back',
                back: 300,
            },
            {
                title: "Example",
                key: 'example',
                dataIndex: 'example'
            },
            {
                title: "Audio",
                key: "audio",
                dataIndex: "audio",
                width: 300,
                render: (text) => {
                    if (text) {
                        return <audio controls>
                            <source src={text} type="audio/mpeg"/>
                        </audio>
                    }
                    return '--';
                }
            },
            {
                title: "Actions",
                key: 'action',
                width: 40,
                render: (text, record) => {
                    return (
                        <>
                            <DeleteOutlined
                                onClick={this.handleDeleteCard.bind(this, record)}
                                className={'pointer text-danger text-danger--important'}
                            />
                        </>
                    )
                }
            }
        ];
    };

    handleDeleteCard = (card) => {
        Modal.confirm({
            title: "Delete card",
            content: "Are you sure to want to delete this card?",
            onOk: () => {
                CardApiService.delete(card.id)
                    .then(() => {
                        notification.success({
                            message: "Delete successful"
                        });

                        this.fetchCards();
                    })
            }
        });
    };


    showModalCreateNewCard = () => {
        this.setState({
            isShowModalCreateNewCard: true
        })
    };

    hideModalCreateNewCard = () => {
        this.setState({
            isShowModalCreateNewCard: false,
            isShowModalEditCard: false,
            card: {}
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

    showEditDesk = () => {
        this.setState({
            isShowEditDesk: true
        })
    };

    hideEditDesk = () => {
        this.setState({
            isShowEditDesk: false
        })
    };


    handleQuickEditDesk = (field, e) => {
        const data = {
            [field] : e.target.value
        };
        this.setState({loading: true});
        DeskApiService.update(this.getId(), data)
            .then(() => {
                notification.success({
                    message: "Update desk successful"
                });

                this.setState({
                    isShowEditDesk: false
                });

                this.fetchDesk();
            })
            .finally(() => {
                this.setState({loading: false});
            })
    };

    content = () => {
        const {cardPagination, desk, isShowEditDesk, loading} = this.state;
        return (
            <div className="desk-detail">
                <div className={'clearfix mg-bt-10 mg-t-10'}>
                    <h1 className={'desk-detail__heading-name'}>
                        {!isShowEditDesk ? (
                            <>
                                Desk {_.get(desk, 'name')}
                                <EditOutlined
                                    className={'mg-l-5 color-blue pointer'}
                                    onClick={this.showEditDesk}
                                />
                            </>
                        ) : (
                            <>
                                <Input
                                    autoFocus={true}
                                    defaultValue={_.get(desk, 'name')}
                                    disabled={loading}
                                    onPressEnter={this.handleQuickEditDesk.bind(this, 'name')}
                                />
                                <CloseOutlined
                                    className={'desk-detail__close_edit'}
                                    onClick={this.hideEditDesk}
                                />
                            </>
                        )}

                    </h1>
                    <div className="desk-detail__actions">
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
                    loading={loading}
                    columns={this.getColumns()}
                    dataSource={this.state.cards}
                    scroll={{x: 1000}}
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
                    destroyOnClose={true}
                >
                    <CardForm
                        loading={loading}
                        onSubmit={this.handleCreateNewCard}
                    />
                </Modal>
            </div>
        )
    }
}

export default DeskDetail;