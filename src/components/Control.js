/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/**
 * 
 *  ██▓ ███▄    █  ██ ▄█▀     ██████  ██▓███   ██▓    ▄▄▄     ▄▄▄█████▓
 *  ▓██▒ ██ ▀█   █  ██▄█▒    ▒██    ▒ ▓██░  ██▒▓██▒   ▒████▄   ▓  ██▒ ▓▒
 *  ▒██▒▓██  ▀█ ██▒▓███▄░    ░ ▓██▄   ▓██░ ██▓▒▒██░   ▒██  ▀█▄ ▒ ▓██░ ▒░
 *  ░██░▓██▒  ▐▌██▒▓██ █▄      ▒   ██▒▒██▄█▓▒ ▒▒██░   ░██▄▄▄▄██░ ▓██▓ ░
 *  ░██░▒██░   ▓██░▒██▒ █▄   ▒██████▒▒▒██▒ ░  ░░██████▒▓█   ▓██▒ ▒██▒ ░
 *  ░▓  ░ ▒░   ▒ ▒ ▒ ▒▒ ▓▒   ▒ ▒▓▒ ▒ ░▒▓▒░ ░  ░░ ▒░▓  ░▒▒   ▓▒█░ ▒ ░░
 *  ▒ ░░ ░░   ░ ▒░░ ░▒ ▒░   ░ ░▒  ░ ░░▒ ░     ░ ░ ▒  ░ ▒   ▒▒ ░   ░
 *  ▒ ░   ░   ░ ░ ░ ░░ ░    ░  ░  ░  ░░         ░ ░    ░   ▒    ░
 *  ░           ░ ░  ░            ░               ░  ░     ░  ░
 * 
 * LICENSE: MIT
 */
import React from 'react';
import { isClassOrComponentFactory } from '../utils/isClassOrComponent';

const BLUR_DIRECTION_REVERSE = '<';
const BLUR_DIRECTION_FORWARD = '>';
const BLUR_DIRECTION_DEFAULT = '>';

/**
 * Defines the base class for controls, which are components with visual representation.
 */
export default class Control extends React.Component {
    /**
     * BLUR_DIRECTION indicates the direction a onBlur() should
     * move focus to next.
     */
    static BLUR_DIRECTION = {
        /**
         * REVERSE indicates the next focused component will be the previous
         * tab order.
         */
        REVERSE: BLUR_DIRECTION_REVERSE,
        /**
         * FORWARD indicates the next focused component will be the next
         * tab order.
         */
        FORWARD: BLUR_DIRECTION_FORWARD,
        /**
         * DEFAULT direction is FORWARD.
         */
        DEFAULT: BLUR_DIRECTION_DEFAULT
    };
    
    /**
     * Returns a boolean which indicates if the provided `anyComponentOrClass` parameter
     * is an instance of `Control` (if passed an object) or a class derived from
     * `Control` (if passed a function) or a component derived from `Control`.
     * 
     * @param {*} anyComponentOrClass Any valid React component or React component class or instance
     * or derived component or class or instance.
     * @return `true` if `anyComponentOrClass` validates, `false` otherwise.
     */
    static isControl(anyComponentOrClass) {
        return isClassOrComponentFactory(Control)(anyComponentOrClass);
    }

    /**
     * Returns a boolean which indicates if the provided `anyComponentOrClass` parameter
     * is an instance of `React.Component` (if passed an object) or a class derived from
     * `React.Component` (if passed a function) or a component derived from `React.Component`.
     * 
     * @param {*} anyComponentOrClass Any valid React component or React component class or instance
     * or derived component or class or instance.
     * @return `true` if `anyComponentOrClass` validates, `false` otherwise.
     */
    static isReactComponent(anyComponentOrClass) {
        return isClassOrComponentFactory(React.Component)(anyComponentOrClass)
            || isClassOrComponentFactory(React.PureComponent)(anyComponentOrClass)
            || (typeof anyComponentOrClass === 'function'
                && React.isValidElement(anyComponentOrClass()))
            || React.isValidElement(anyComponentOrClass);
    }

    /**
     * Checks a React component to see if it has any children in props.
     * 
     * @param {*} component A proposed React component to inspect.
     */
    static componentHasChildren(component) {
        return !!(Control.isReactComponent(component)
            && component.props !== undefined
            && component.props.children !== undefined
            && Array.isArray(component.props.children)
            && component.props.children.length > 0);
    }
    
    /**
     * 
     * @param {*} controlOrComponent 
     */
    static firstFocusableControlOf(controlOrComponent) {
        if (Control.componentHasChildren(controlOrComponent)) {
            const { children } = controlOrComponent.props;
            for (let c = 0; c < children.length; c++) {
                const child = children[c];
                if (Control.isControl(child)) {
                    if (child.canFocus()) {
                        return child;
                    }
                }
                else if (Control.isReactComponent(child)) {
                    // recursive call into firstFocusableControlOf(child)
                    const firstFocusableInChild = Control.firstFocusableControlOf(child);
                    if (firstFocusableInChild != null) {
                        return firstFocusableInChild;
                    }
                }
            }
        }
        return null;
    }

    static prevFocusableChild() {
        
    }

    /**
     * 
     */
    static nextFocusableChild() {
        
    }
        
    static lastFocusableChild(controlOrComponent) {
        if (Control.componentHasChildren(controlOrComponent)) {
            const { children } = controlOrComponent.props;
            for (let c = 0; c < children.length; c++) {
                const { child } = children[c];
                if (Control.isControl(child)) {
                    if (child.canFocus()) {
                        return child;
                    }
                }
                else if (Control.isReactComponent(child)) {
                    // recursive call into firstFocusableControlOf(child)
                    const firstFocusableInChild = Control.firstFocusableControlOf(child);
                    if (firstFocusableInChild != null) {
                        return firstFocusableInChild;
                    }
                }
            }
        }
        return null;
    }

    static buildControlForComponent(type, props, children) {
        return (
          <Control
            wrapComponent={<type {...props} />}
          >
            {children}
          </Control>
        );
    }

    static wrapComponent(component) {
        const { type } = component;
        const props = (
            component.props
            ?
            { ...component.props, children: undefined }
            :
            { }
        );
        const children = (
            (component.props
                && component.props.children)
            ?
            component.props.children
            :
            null
        );
        return (
            (component
                && Control.isReactComponent(component)
                && type
                && Control.isReactComponent(type))
            ?
            Control.buildControlForComponent(type, props, children)
            :
            null
        );
    }


    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            canIReachThisState: 'yep!'
        };
        // A basic Control, by itself, isn't focusable.
        // Some of it's child Controls will be focusable, and need to specify
        // when that is the case.
        this.focusable = false;
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
        return this.isEnabled()
            && this.isBlurred()
            && (this.isFocusable()
                || this.containsFocusable());
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
        return this.isEnabled()
            && this.isFocused();
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

    /**
     * The `isDisabled()` method returns a boolean which indicates the value of
     * the `disabled` property as passed into the component.
     * 
     * `<Control disabled />` would cause `isDisabled()` to return `true`.
     * 
     * `<Control />` would cause `isDisabled()` to return `false`.
     */
    isDisabled() {
        const {
            props
        } = this;
        return props !== undefined && (!!props.disabled);
    }
    
    /**
     * The `isEnabled()` method returns the inverse value of the `isDisabled()`
     * method.
     * 
     * `<Control disabled />` would cause `isEnabled()` to return `false`.
     * 
     * `<Control />` would cause `isEnabled()` to return `true`.
     */
    isEnabled() {
        return !this.isDisabled();
    }

    /**
     * The `isFocused()` method returns a boolean which indicates the value of
     * the `focused` property as passed into the component, as long as it
     * is not `disabled`.
     * 
     * `<Control focused />` would cause `isFocused()` to return `true`,
     * unless the `Control` is disabled.
     * 
     * `<Control focused disabled />` would cause `isFocused()` to return
     * `false`, and is not a valid state for the Control component.
     * 
     * `<Control />` would cause `isFocused()` to return `false`.
     */
    isFocused() {
        const {
            props
        } = this;
        return props !== undefined && (!!props.focused && this.isEnabled());
    }
    
    /**
     * The `isFocusable()` method returns a boolean which indicates the value of the
     * field, `focusable`. It is checked throughout other functions in Control, but
     * can be safely overridden if you would like to extend Control so that it is
     * `focusable`. The `focusable` field is normally set to `false` unless it is
     * set manually, either using a consumer or by extending the `Control` class.
     */
    isFocusable() {
        return this.focusable;
    }

    /**
     * The `isBlurred()` method returns the inverse of the `isFocused()` method.
     */
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
        if (props && props.children && props.children.length) {
            for (let c = 0; c < props.children.length; c++) {
                if (props.children[c].containsFocus &&
                    props.children[c].containsFocus())
                    return true;
            }
        }
        return false;
    }
    
    containsFocusable() {
        return Control.firstFocusableControlOf(this) != null;
    }
    
    hasChildren() {
        return Control.componentHasChildren(this);
    }
    
    // /**
    //  * Renders a child component from the `props.children` array.
    //  */
    // // eslint-disable-next-line class-methods-use-this, no-unused-vars
    // renderChild(child, index, childrenArray) {
    //     return child; // as-is
    //     // return (
    //     //     // child as-is if it's a Control
    //     //     (Control.isControl(child) && child)
    //     //     // otherwise we need to wrap it up
    //     //     || (<Control wrapComponent={child} />)
    //     // );
    // }

    // renderChildren() {
    //     const { props } = this;
    //     return (
    //         this.hasChildren() &&
    //         props.children.map(this.renderChild)
    //     ) || [];
    // }

    // renderWrappedComponent() {
    //     const { props } = this;
    //     return (
    //         props
    //         && props.wrapComponent
    //         (
    //             (Control.isControl(props.wrapComponent)
    //                 && props.wrapComponent)
    //             || (Control.isReactComponent(props.wrapComponent)
    //                 && Control.wrapComponent(props.wrapComponent))
    //         )
    //     ) || null;
    // }

    render() {
        // const outputs = [];
        // const wrapped = this.renderWrappedComponent();
        // if (wrapped)
        //     outputs.push(wrapped);
        // outputs.concat(this.renderChildren());
        // if (outputs.length === 0) return null;
        // if (outputs.length === 1) return outputs[0];
        // return (
        //   <Control>{outputs}</Control>
        // );
        const { props } = this;
        return props.children||null;
    }
}