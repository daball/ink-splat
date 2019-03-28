// A substantial portion of this code came from https://github.com/jdeniau/ink-tab
// My additions are concerned with making it look like a TabBar but not behaving like one
// if it isn't in focus.

import React, { Component } from 'react';
import { Control } from './Control';
import readline from 'readline';
import PropTypes from 'prop-types';
import { Box, Color, StdinContext } from 'ink';

class Tab extends Component {
    render() {
      return this.props.children;
    }
}

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

class TabsWithStdin extends Control {
  constructor(props) {
    super(props);

    this.isColumn = this.isColumn.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.moveToNextTab = this.moveToNextTab.bind(this);
    this.moveToPreviousTab = this.moveToPreviousTab.bind(this);

    this.state = {
      ...this.state,
      activeTab: 0,
    };
  }

  componentDidMount() {
    const { stdin, setRawMode } = this.props;

    // use ink / node `setRawMode` to read key-by-key
    setRawMode(true);

    // and listen to keypress events
    readline.emitKeypressEvents(stdin);

    stdin.on('keypress', this.handleKeyPress);

    // select the first tab on component mount
    this.handleTabChange(0);
  }

  componentWillUnmount() {
    const { stdin } = this.props;

    stdin.removeListener('keypress', this.handleKeyPress);
  }

  handleTabChange(tabId) {
    const tab = this.props.children[tabId];

    if (!tab) {
      return;
    }

    this.setState({
      activeTab: tabId,
    });

    if (this.props.onChange)
        this.props.onChange(tab.props.name, tab);
    if (this.props.onTabIdChange)
        this.props.onTabIdChange(tabId);
  }

  handleKeyPress(ch, key) {
    if (!key) {
      return;
    }

    switch (key.name) {
      case 'left': {
        if (this.isColumn()) {
          return;
        }

        this.moveToPreviousTab();
        break;
      }

      case 'up':
        if (!this.isColumn()) {
          return;
        }

        this.moveToPreviousTab();
        break;

      case 'right': {
        if (this.isColumn()) {
          return;
        }

        this.moveToNextTab();
        break;
      }

      case 'down':
        if (!this.isColumn()) {
          return;
        }

        this.moveToNextTab();
        break;

      case 'tab':
      //   if (true === key.shift) {
      //     this.moveToPreviousTab();
      //   } else {
      //     this.moveToNextTab();
      //   }

      //   break;
      // }
      case 'return': {
        this.blur();
        break;
      }
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        if (true === key.meta) {
          const tabId = '0' === key.name ? 9 : parseInt(key.name, 10) - 1;

          this.handleTabChange(tabId);
        }
      }

      default:
        return;
    }
  }

  isColumn() {
    const { flexDirection } = this.props;

    return flexDirection === 'column' || flexDirection === 'column-reverse';
  }

  moveToNextTab() {
    let nextTabId = this.state.activeTab + 1;
    if (nextTabId >= this.props.children.length) {
      nextTabId = 0;
    }

    this.handleTabChange(nextTabId);
  }

  moveToPreviousTab() {
    let nextTabId = this.state.activeTab - 1;
    if (nextTabId < 0) {
      nextTabId = this.props.children.length - 1;
    }

    this.handleTabChange(nextTabId);
  }

  render() {
    const { children, onChange, flexDirection, ...rest } = this.props;

    const separator = this.isColumn() ? '──────' : ' | ';

    return (
      <Box flexDirection={flexDirection} {...rest}>
        {children.map((child, key) => {
          const { name } = child.props;

          return (
            <Box key={name} flexDirection={flexDirection}>
              {key !== 0 && <Color dim>{separator}</Color>}
              <Box>
                <Color keyword="grey">{key + 1}. </Color>
                <Color
                  bgGreen={this.state.activeTab === key}
                  black={this.state.activeTab === key}
                >
                  {child}
                </Color>
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  }
}

class TabsWithoutStdin extends Control {
    constructor(props) {
      super(props);
  
      this.isColumn = this.isColumn.bind(this);
    }
      
    isColumn() {
      const { flexDirection } = this.props;
  
      return flexDirection === 'column' || flexDirection === 'column-reverse';
    }
  
    render() {
      const { children, onChange, flexDirection, ...rest } = this.props;
  
      const separator = this.isColumn() ? '──────' : ' | ';
  
      return (
        <Box flexDirection={flexDirection} {...rest}>
          {children.map((child, key) => {
            const { name } = child.props;
  
            return (
              <Box key={name} flexDirection={flexDirection}>
                {key !== 0 && <Color dim>{separator}</Color>}
                <Box>
                  <Color keyword="grey">{key + 1}. </Color>
                  <Color
                    bgGreen={this.props.activeTab === key}
                    black={this.props.activeTab === key}
                  >
                    {child}
                  </Color>
                </Box>
              </Box>
            );
          })}
        </Box>
      );
    }
}

class Tabs extends Control {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StdinContext.Consumer>
          {({ stdin, setRawMode }) => (
              <TabsWithStdin stdin={stdin} setRawMode={setRawMode} {...this.props} />
          )}
      </StdinContext.Consumer>
    );
  }
}

class ShadedTabs extends Control {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <TabsWithoutStdin {...this.props} />
    );
  }
} 

// Tabs.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };

class TabBar extends Control {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            activeTab: 0
        };
        this.handleTabIdChange = this.handleTabIdChange.bind(this);
        if (this.props.children.length > 0 && this.props.onChange) {
          const tab = this.props.children[0];
          this.props.onChange(tab.props.name, tab);
        }
    }
    handleTabIdChange(activeTab) {
        this.setState({activeTab});
    }
    canFocus() {
        return true;
    }
    render() {
        return (
            this.isFocused()
            ?
            <Tabs
                {...this.props}
                onTabIdChange={this.handleTabIdChange}
            />
            :
            <ShadedTabs
                {...this.props}
                activeTab={this.state.activeTab}
            />
        );
    }
}

export { Tab, TabBar };