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
import ink, { AppContext } from 'ink';
import Control from './Control';
import { isClassOrComponentFactory } from '../utils/isClassOrComponent';

/**
 * 
 */
export default class App extends Control {
    /**
     * Returns a boolean which indicates if the provided `anyComponentOrClass` parameter
     * is an instance of `App` (if passed an object) or a class derived from
     * `App` (if passed a function) or a component derived from `App`.
     * 
     * @param {*} anyComponentOrClass Any valid React component or React component class or instance
     * or derived component or class or instance.
     * @return `true` if `anyComponentOrClass` validates, `false` otherwise.
     */
    static isApp(anyComponentOrClass) {
        return isClassOrComponentFactory(App)(anyComponentOrClass);
    }

    static run(appOrComponent) {
        return (App.isApp(appOrComponent) ? App.render(appOrComponent) : null);
    }
    
    static render(appOrComponent, options) {
        const { props, state } = appOrComponent;
        const appRoot = (
          <AppContext.Consumer>
            {
                ({ exit }) => {
                    if (state.isExiting) {
                        if (props.onExit) {
                            props.onExit();
                            exit();
                        }
                    }
                    return App.isApp(appOrComponent) ? appOrComponent : null;
                }
            }
          </AppContext.Consumer>   
        );
        return (App.isApp(appOrComponent) ? ink.render(appRoot, options) : null);
    }
    
    /**
     * Call this function to exit the app.
     */
    exit() {
        const { props } = this;
        if (props.onBeforeExit) {
            const { cancel, exitCode } = props.onBeforeExit();
            this.setState({ isExiting: (cancel !== undefined && !cancel) || true, exitCode: exitCode||0 });
        }
        else {
            this.setState({ isExiting: true, exitCode: 0 });
        }
    }
    
    render() {
    }
    
    
 }