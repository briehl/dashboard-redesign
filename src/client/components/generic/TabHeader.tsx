import React, { Component } from 'react';

interface Props {
  selectedIdx: number;
  tabs: string[];
  onSelectTab?: (idx: number, name: string) => void;
  className?: string;
}

interface State {
  tabs: string[];
  selectedIdx: number;
}

// Horizontal tab navigation UI.
export class TabHeader extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const selectedIdxProps = this.props.selectedIdx
      ? this.props.selectedIdx
      : 0;
    this.state = {
      tabs: this.props.tabs,
      selectedIdx: selectedIdxProps,
    };
  }

  // Select a new tab to activate
  select(idx: number) {
    if (idx >= this.state.tabs.length || idx < 0) {
      throw Error(
        `Invalid tab index ${idx}. Max is ${this.state.tabs.length -
          1} and min is 0.`
      );
    }
    this.setState({ selectedIdx: idx });
    if (this.props.onSelectTab) {
      this.props.onSelectTab(idx, this.state.tabs[idx]);
    }
  }

  // Handle click event on a tab element
  handleClickTab(idx: number) {
    if (idx !== this.state.selectedIdx) {
      this.select(idx);
    }
  }

  render() {
    const { tabs } = this.props;
    const { selectedIdx } = this.state;
    let outerClass = 'pt2';
    if (this.props.className) {
      outerClass += ` ${this.props.className}`;
    }
    return (
      <div className={outerClass}>
        <ul
          className="list pa0 ma0 flex items-center"
          style={{ position: 'relative', top: '1px' }}
        >
          {tabs.map((tabText, idx) => {
            const className =
              selectedIdx === idx ? tabClasses.active : tabClasses.inactive;
            return (
              <li
                key={tabText}
                className={className}
                onClick={() => this.handleClickTab(idx)}
                style={{ userSelect: 'none' }}
              >
                {tabText}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// Active and inactive tab styles using Tachyons classes
const tabClasses = {
  active: 'dib pv3 ph3 bb bw1 b--green',
  inactive: 'dib pv3 pointer dim ph3 bb bw1 b--transparent',
};
