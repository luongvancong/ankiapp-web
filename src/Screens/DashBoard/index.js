import React from 'react';
import {Button, Modal, Spin, Typography} from "antd";
import _ from 'lodash';
import Default from "../Layout/Default";
import DeskApiService from "../../Services/DeskApiService";
import {Link} from "react-router-dom";
import DeskForm from "../../Components/DeskForm";

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
                        {desks.map(item => (
                            <Button
                                type={'default'}
                                className={'desks__item'}
                            >
                                <Link to={`/desks/${_.get(item, 'id')}`}>{_.get(item, 'name')}</Link>
                            </Button>
                        ))}
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