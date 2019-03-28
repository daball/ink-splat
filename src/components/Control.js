import React from 'react';
export class Control extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            // isFocused: this.props.focused ? true : false
        };
    }
    canFocus() {
        return false;
    }
    canBlur() {
        return this.isFocused();
    }
    focus() {
        if (this.canFocus()) {
            // this.setState({isFocused: true});
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        }
    }
    blur() {
        if (this.canBlur()) {
            // this.setState({isFocused: false});
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        }
    }
    isFocused() {
        return this.props.focused;
    }
    containsFocus() {
        if (this.isFocused()) {
            return true;
        }
        else {
            for (let c = 0; c < this.props.children.length; c++) {
                if (this.props.children[c].containsFocus
                    && this.props.children[c].containsFocus())
                    return true;
            }
        }
        return false;
    }
    render() {
		return this.props.children;
    }
}