/* eslint-disable react/jsx-one-expression-per-line */
/**
 * A substantial portion of this code came from https://github.com/jdeniau/ink-tab
 * My additions are concerned with making it look like a TabBar but not behaving like one
 * if it isn't in focus.
 */

import React, { Component } from 'react';
import readline from 'readline';
// import PropTypes from 'prop-types';
import { Box, Color, StdinContext, Text } from 'ink';
import Control from './Control';

class Tab extends Component {
    render() {
      const { props } = this;
      return props.children;
    }
}

// Tab.propTypes = {
//   children: PropTypes.node.isRequired,
//   name: PropTypes.string.isRequired,
// };

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
    };
  }

  componentDidMount() {
    const { activeTab, stdin, setRawMode } = this.props;
    // use ink / node `setRawMode` to read key-by-key
    setRawMode(true);
    // and listen to keypress events
    readline.emitKeypressEvents(stdin);
    stdin.on('keypress', this.handleKeyPress);
    // select the first tab on component mount (if not active tab is selected)
    if (!activeTab)
      this.handleTabChange(0);
  }

  componentWillUnmount() {
    const { stdin } = this.props;
    stdin.removeListener('keypress', this.handleKeyPress);
  }

  handleTabChange(tabId) {
    const { onChange, onTabIdChange } = this.props;
    const tab = this.props.children[tabId];
    if (!tab) {
      return;
    }
    if (onChange)
        onChange(tab.props.name, tab);
    if (onTabIdChange)
        onTabIdChange(tabId);
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
      // case 'tab':
      //   if (true === key.shift) {
      //     this.moveToPreviousTab();
      //   } else {
      //     this.moveToNextTab();
      //   }
      //   break;
      // }
      case 'tab':
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
      case '9':
        if (key.meta === true) {
          const tabId = key.name === '0' ? 9 : parseInt(key.name, 10) - 1;
          this.handleTabChange(tabId);
        }
        break;
      default:        
    }
  }

  isColumn() {
    const { flexDirection } = this.props;

    return flexDirection === 'column' || flexDirection === 'column-reverse';
  }

  moveToNextTab() {
    const { activeTab, children } = this.props;
    let nextTabId = activeTab + 1;
    if (nextTabId >= children.length) {
      nextTabId = 0;
    }

    this.handleTabChange(nextTabId);
  }

  moveToPreviousTab() {
    const { activeTab, children } = this.props;
    let nextTabId = activeTab - 1;
    if (nextTabId < 0) {
      nextTabId = children.length - 1;
    }

    this.handleTabChange(nextTabId);
  }

  render() {
    const { activeTab, children, onChange, flexDirection, ...rest } = this.props;

    const separator = this.isColumn() ? '──────' : ' | ';

    return (
      <Box flexDirection={flexDirection} {...rest}>
        {children.map((child, key) => {
          const { name } = child.props;

          return (
            <Box key={name} flexDirection={flexDirection}>
              {key !== 0 && <Color dim>{separator}</Color>}
              <Box>
                <Color keyword="grey">
                  <Text>{key + 1}. </Text>
                </Color>
                <Color
                  bgGreen={activeTab === key}
                  black={activeTab === key}
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
      const { activeTab, children, onChange, flexDirection, ...rest } = this.props;
  
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
                    bgGreen={activeTab === key}
                    black={activeTab === key}
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

    render() {
        return (
            this.isFocused()
            ?
            (
              <Tabs
                {...this.props}
                activeTab={this.state.activeTab}
                onTabIdChange={this.handleTabIdChange}
              />
            )
            :
            (
              <ShadedTabs
                {...this.props}
                activeTab={this.state.activeTab}
              />
            )
        );
    }
}

export { Tab, TabBar };