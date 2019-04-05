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
import ReactDOM from 'react-dom';
import Window from 'window';

export default function renderJSDOM(component, window = new Window()) {
    const { document } = window;

    const origGlobals = {
        window: global.window,
        document: global.document
    };
    global.window = window;
    global.document = document;

    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    // const renderer =
    ReactDOM.render(component, container);

    // const output = window;

    Object.keys(origGlobals).forEach(prop => {
        global[prop] = origGlobals[prop];
    });

    // return renderer;
    return container;
}