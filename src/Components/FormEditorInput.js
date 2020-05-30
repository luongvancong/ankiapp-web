import React from 'react';
import {MyEditor} from "./MyEditor";

class FormEditorInput extends React.Component {

    handleChange = (content) => {
        if (this.props.onChange) {
            this.props.onChange(content)
        }
    };

    render() {
        return (
            <MyEditor
                onChange={this.handleChange}
            />
        )
    }
}

export default FormEditorInput;