import React from 'react';

class FilterMatchesToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Off"
    };
    this.changeTextForLabel = this.changeTextForLabel.bind(this);
  }

  changeTextForLabel() {
    let newLabel = "";
    !this.props.toggleOnOff ? newLabel = "On" : newLabel = "Off"
    this.setState({
      label: newLabel
    });
  }

  render() {
    return (
      <div className="field">
        <input
          id="filterMatchesToggle"
          type="checkbox"
          name="filterMatchesToggle"
          className="switch is-success"
          onClick={async () => {
            this.props.changeSwitch();
            this.changeTextForLabel();
          }}
        />
        <label htmlFor="filterMatchesToggle">Show All Matches To Bet On</label>
        <div>
          <strong>{this.state.label}</strong>
        </div>
      </div>
    );
  }
}

export default FilterMatchesToggle;
