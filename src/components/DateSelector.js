import DatePicker from 'react-datepicker';
import moment from 'moment';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}

export default DateSelector