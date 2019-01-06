import React from 'react';
import ReactGA from 'react-ga';

class DateRangeButton extends React.Component {
  render() {
    return (
      <div>
        <a
          className="button is-info is-outlined is-medium is-fullwidth"
          onClick={async () => { 
            this.props.buttonAction()
            ReactGA.event({
              category: 'User',
              action: this.props.text
            });
          }}
        >
          {this.props.text}
        </a>
      </div>
    );
  }
}

export default DateRangeButton;
