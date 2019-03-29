/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import React from 'react';
/**
 * Defines the base class for controls, which are components with visual representation.
 * 
 * You can pass properties into the Control class which will cause certain 
 */
export default class Control extends React.Component {
    /**
     * Returns a boolean which indicates if the provided anyComponentOrClass parameter
     * is an instance of Control (if passed an object) or a class derived from
     * Control (if passed a function).
     * 
     * @param {*} anyComponentOrClass Any valid React component or React component class.
     */
    static isControl(anyComponentOrClass) {
        switch (typeof anyComponentOrClass) {
            case 'object':
                return (anyComponentOrClass instanceof Control);
            case 'function':
                return (anyComponentOrClass.prototype instanceof Control);
            default:
                return false;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state
        };
    }

    /**
     * Returns a boolean which indicates if a Control instance is focusable.
     * 
     * The default behavior is to always return true unless it is already focused.
     * 
     * The select(control) default behavior will always check the Control instance's canFocus()
     * before doing any work.
     * 
     * Most Controls which exist will be focusable. It is the default behavior that a derived
     * Control class is always focusable.
     * 
     * If you want to disable focusable in a specific way, you can override the function and
     * return false instead of true.
     * 
     * For example, consider a TextField whose input might be disabled for now. During the
     * disabled state, canFocus() would return false, but otherwise return true.
     */
    // eslint-disable-next-line class-methods-use-this
    canFocus() {
        return true;
    }

    /**
     * Returns a boolean which indicates if the Control instance is un-focusable.
     * 
     * Most Controls which exist will be focusable. It is the deault behavior that a derived
     * Control class is always focusable.
     * 
     * If you want to disable focusable in a specific way, you can override the function and
     * return false instead of true.
     * 
     * For example, consider a TextField whose input might be disabled for now. During the
     * disabled state, canFocus() would return false, but otherwise return true.
     */
    canBlur() {
        return this.isFocused();
    }

    /**
     * 
     *  In a command line interface, where focusable controls exist (think Visual Basic for DOS)
     *  to get an idea of the concept, we can't completely blur out of EVERY single control.
     *
     *  Something is always going to ALWAYS need to be accept / capture input, be it a Button
     *  or TextField or a Menu or a Tab or Tree. But the concept of the Control component is
     *  that it can easily allow focus to shift from one component to the next, and allow those
     *  components which extend the Control class to easily display one type of blurred output
     *  while accepting input once focused.
     *
     *  In order to guarantee this, blur will locate the forward (or reverse component)
     *  and 'select' it instead.
     */
    blur() {
        if (this.canBlur()) {
            const {
                props
            } = this;
            // let our listeners know 
            if (props.onBlur) {
                props.onBlur();
            }
        }
    }

    focus() {
        if (this.canFocus()) {
            const {
                props
            } = this;
            // let our listeners know 
            if (props.onFocus) {
                props.onFocus();
            }
        }
    }

    isDisabled() {
        const {
            props
        } = this;
        return !!props.disabled;
    }

    isEnabled() {
        return !this.isEnabled();
    }

    isFocused() {
        const {
            props
        } = this;
        return !!props.focused;
    }

    isBlurred() {
        return !this.isFocused();
    }

    containsFocus() {
        const {
            props
        } = this;
        if (this.isFocused()) {
            return true;
        }
        for (let c = 0; c < props.children.length; c++) {
            if (props.children[c].containsFocus &&
                props.children[c].containsFocus())
                return true;
        }
        return false;
    }

    render() {
        const {
            props
        } = this;
        return props.children;
    }
}