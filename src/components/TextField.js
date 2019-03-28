import React from 'react';
import { Control } from './Control';
import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
export class TextField extends Control {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            newValue: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    canFocus() {
        return true;
    }
    handleChange(newValue) {
        this.setState({newValue});
        if (this.props.onChange)
            this.props.onChange(newValue);
    }
	handleSubmit(newValue) {
        newValue = newValue.trim();
        this.setState({newValue});
        this.blur();
        if (this.props.onSubmit)
            this.props.onSubmit(newValue);
    }
    render() {
		return (
            <Box>
                {
                    this.props.caption
                    &&
                    <Box marginRight={1}>
                        {this.props.caption}
                    </Box>
                }
                {
                    this.isFocused()
                    ?
                    <TextInput
                        value={this.state.newValue}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                    />
                    :
                    <Text>{this.props.value}</Text>
                }
			</Box>
        );
    }
  }