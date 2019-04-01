/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import React from 'react';
import Control from './Control';
import { isClassOrComponentFactory } from '../utils/isClassOrComponent';

/**
 * Provides focus-management functionality for controls that can function as a container
 * for other controls.
 */
export default class ContainerControl extends Control {
    /**
     * Returns a boolean which indicates if the provided `anyComponentOrClass` parameter
     * is an instance of `ContainerControl` (if passed an object) or a class derived from
     * `ContainerControl` (if passed a function) or a component derived from `ContainerControl`.
     * 
     * @param {*} anyComponentOrClass Any valid React component or React component class or instance
     * or derived component or class or instance.
     * @return `true` if `anyComponentOrClass` validates, `false` otherwise.
     */
    static isContainerControl(anyComponentOrClass) {
        return isClassOrComponentFactory(ContainerControl)(anyComponentOrClass);
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            activeControl: ''
        };
    }

    /**
     * Returns a boolean which indicates if a ContainerControl instance is focusable.
     * 
     * The default behavior is to:
     * (1) check containsFocus(): if true, return false (already focused); if false, proceed to
     * (2) return containsFocusable()
     */
    canFocus() {
        return (!this.containsFocus() && this.containsFocusable());
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

    select(control) {
        // disable linter for now
        // TODO: fix this routine
        this.canFocus();
        if (Control.isDerivedControl(control)) {
            if (control.canFocus()) {
                if (control.props.onFocus) {
                    control.props.onFocus();
                }
            }
        }
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
            // let our listeners know 
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        }
    }

    isFocused() {
        return this.props.focused;
    }

    containsFocusable() {
        for (let c = 0; c < this.props.children.length; c++) {
            if (this.props.children[c].containsFocus &&
                this.props.children[c].containsFocus())
                return true;
        }
        return false;
    }

    renderChildren() {
        // let countDerived = 0;
        // we are going to modify the children array such that when one of our children components
        // blurs, we will bubble it out to select the next focusable control
        if (this.props.children) {
            const modifiedChildren = this.props.children.map((el) =>
            // expanded: const modifiedChildren = this.props.children.map((el, i, all) =>
                Control.isDerivedControl(el) ? React.cloneElement(el, {

                }) : el
            );
            return modifiedChildren;
        }
        return null;
    }

    render() {
        return this.renderChildren();
    }
}