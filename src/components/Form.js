// import React from 'react';
import ContainerControl from './ContainerControl';
/**
 * Form is a ContainerControl which will select the first control upon activation.
 */
export default class Form extends ContainerControl {
    /**
     * Returns a boolean which indicates if the provided anyComponentOrClass parameter
     * is an instance of Form (if passed an object) or a class derived from
     * Form (if passed a function).
     * 
     * @param {*} anyComponentOrClass Any valid React component or React component class.
     */
    static isForm(anyComponentOrClass) {
        if (anyComponentOrClass === Form) {
            return true;
        }
        switch (typeof anyComponentOrClass) {
            case 'object':
                return (anyComponentOrClass instanceof Form);
            case 'function':
                return (anyComponentOrClass.prototype instanceof Form);
            default:
                return false;
        }
    }

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