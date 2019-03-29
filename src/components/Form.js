// import React from 'react';
import ContainerControl from './ContainerControl';
/**
 * Form is a ContainerControl which will select the first control upon activation.
 */
export default class Form extends ContainerControl {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
        };
    }
    // componentDidMount() {
    //     super.componentWillMount();
    //     this.selectFirst();
    // }
}