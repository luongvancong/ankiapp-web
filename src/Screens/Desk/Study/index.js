import React from 'react';
import Default from "../../Layout/Default";
import DeskApiService from "../../../Services/DeskApiService";
import _ from "lodash";
import {Button, Spin} from "antd";
import {Link} from "react-router-dom";

class DeskStudy extends Default {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            cards: [],
            cardsStudied: []
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.fetchCards();
    }

    getId = () => {
        return this.props.match.params.id;
    };

    fetchCards = () => {
        this.setState({loading: true});
        DeskApiService.getStudy(this.getId())
            .then(response => {
                const responseData = _.get(response, 'data');
                this.setState({
                    cards: responseData
                });
            })
            .finally(() => {
                this.setState({loading: false});
            })
    };

    showAnswer = () => {
        this.setState({
            isShowAnswer: true
        })
    };

    handleNext = (card) => {
        const {cardsStudied} = this.state;
        cardsStudied.push(card.id);
        this.setState({
            cardsStudied,
            isShowAnswer: false
        })
    };

    renderOneCard = () => {
        const {cardsStudied, isShowAnswer} = this.state;
        const cards = _.cloneDeep(this.state.cards);
        const newCards = cards.filter(item => cardsStudied.indexOf(item.id) < 0);
        const oneCard = _.first(newCards);
        if (cardsStudied.length === cards.length) {
            return (
                <Button type={'primary'}>
                    <Link to={`/desks/${this.getId()}`}>Back to desk</Link>
                </Button>
            )
        }
        return (
            <div className={'card'}>
                <p className={'card__front'}>{oneCard.front}</p>
                {isShowAnswer && (
                    <>
                        <p className={'card__back'}>{oneCard.back}</p>
                        <p className={'card__example'}>{oneCard.example}</p>
                        {oneCard.audio && (
                            <div className="card__audio">
                                <audio controls autoPlay={true}>
                                    <source src={oneCard.audio} type="audio/mpeg"/>
                                </audio>
                            </div>
                        )}
                        <div className={'card__image mg-bt-20'}>
                        {oneCard.image && (
                            <img src={oneCard.image} />
                        )}
                        </div>
                    </>
                )}

                {!isShowAnswer ? (
                    <Button
                        type={'primary'}
                        onClick={this.showAnswer}
                    >
                        Show answer
                    </Button>
                ) : (
                    <Button
                        type={'primary'}
                        onClick={this.handleNext.bind(this, oneCard)}
                    >
                        Next
                    </Button>
                )}
            </div>
        )
    };

    content = () => {
        const {loading} = this.state;
        return (
            <Spin spinning={loading}>
                <div className={'study'}>
                    {this.renderOneCard()}
                </div>
            </Spin>
        );
    }
}

export default DeskStudy;