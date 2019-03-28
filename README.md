## ink-splat

ink-splat is a component library for ink.

## Why?

Because I figured focusable screen components made sense.

Ink's components will let you type in text input and then not do much else.
I need to be able to ask the user multiple questions. So focusable components
is the direction I'm heading.

## How it works

To install:

`npm i -S ink ink-splat`

To build:

`npm run-script build`

To use, see the demo app in `./src/test/*.js`.

To run the demo app, try:

`node ./dist/test/FocusBlur`

## Components Available

### Control

Control provides a base class for which other components can derive. It's intent was to simplify focus/blur behaviors. You will extend Control rather than use it (in theory).

#### Extending Control

    export class TextField extends Control {
        constructor(props) {
            super(props);
            this.state = {
                ...this.state
            };
        }
        render() {
            if (this.isFocused()) {
                //return editor layout
            }
            else {
                //return viewer layout
            }
        }
    }

### TabBar

TabBar is a focusable Tabs component. A considerable portion of this code came from [@jdeniau/ink-tab](https://github.com/jdeniau/ink-tab). Works just like Tabs, but you get the extra onBlur and onFocus events.

#### TabBar example

    <TabBar
        onChange={this.handleTabChange}
        focused={this.state.focusedComponent==='tabBar'}
        onBlur={() => (
            (this.state.activeTabName === 'bio' && this.setState({focusedComponent: 'txtName'}))
            || (this.state.activeTabName === 'exit' && exit())
        )}>
        <Tab name="readme">Readme</Tab>
        <Tab name="bio">Bio</Tab>
        <Tab name="report">Report</Tab>
        <Tab name="exit">Exit</Tab>
    </TabBar>

### TextField

TextField is a focusable TextInput component, which is only a Text component whenever blurred.

#### TextField example

    <TextField
        value={app.state.name}
        focused={this.state.focusedComponent==='txtName'}
        caption={<Text bold><Color bgMagenta whiteBright>Your Name:</Color></Text>}
        onChange={(newName) => this.setState({newName})}
        onSubmit={(name) => this.setState({name})}
        onBlur={() => this.setState({focusedComponent: 'txtBio'})}
        />

## Copyright

2019 [David A. Ball](https://www.daball.me)

It is still a work in progress.

## License

MIT.