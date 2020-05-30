import React, {Component} from 'react';
import { EditorState, convertToRaw, ContentState, getDefaultKeyBinding } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button} from "antd";

class MyEditor extends Component {
    constructor(props) {
        super(props);
        this.editorReferece = null;
        this.state = {
            editorState: EditorState.createEmpty(),
            isKeyDown: false
        }
    }

    componentDidMount() {
        if(this.props.value) {
            this.toDaft(this.props.value);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.value === undefined || prevProps.value === '') {
            this.toDaft(this.props.value);
        }
    }

    toHtml = () => {
        const {editorState} = this.state;
        return editorState.getCurrentContent().getPlainText().length > 0
            ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : "";

    };

    toDaft = (html) => {
        if(html) {
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({editorState});
            }
        }
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        if(this.state.isKeyDown) {
            let content = editorState.getCurrentContent().getPlainText().length > 0
                ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : "";

            this.props.onChange(content, editorState);
        }
    };

    setEditorReference = (ref) => {
        this.editorReferece = ref;
    };

    onKeyDown = (e) => {
        this.setState({isKeyDown: true});
        return getDefaultKeyBinding(e);
    };

    handleSubmit = () => {
        const {editorState} = this.state;
        let content = editorState.getCurrentContent().getPlainText().length > 0
            ? draftToHtml(convertToRaw(editorState.getCurrentContent())) : "";
        this.props.onSubmit(content);
    };

    render() {
        const {editorState} = this.state;
        const {showSubmitButton} = this.props;
        return (
            <React.Fragment>
                <Editor
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder="Nhấp chuột để nhập nội dung"
                    editorRef={this.setEditorReference}
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    keyBindingFn={this.onKeyDown}
                />
                {showSubmitButton && (
                    <Button type={'primary'} onClick={this.handleSubmit}>Gửi thảo luận</Button>
                )}
            </React.Fragment>
        )
    }
}

MyEditor.defaultProps = {
    value: undefined,
    onChange: (html, editorState) => {},
    showSubmitButton: false,
    onSubmit: (content) => {}
};

export {MyEditor};