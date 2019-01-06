import React from 'react';
import './styles/App.css';
import Match from './components/Match';
import DateRangeButton from './components/DateRangeButton';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import moment from 'moment';
import ReactGA from 'react-ga';
import Footer from './components/Footer';
import Header from './components/Header';
import FilterMatchesToggle from './components/FilterMatchesToggle';

const client = new ApolloClient({
  uri: process.env.REACT_APP_TIP_GEN_API
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      passOnly: false
    };

    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.changeSwitch = this.changeSwitch.bind(this);
    this.getPrevious3daysMatches = this.getPrevious3daysMatches.bind(this);
    this.getNext3DaysMatches = this.getNext3DaysMatches.bind(this);
    this.getNext7DaysMatches = this.getNext7DaysMatches.bind(this);
    this.getTodaysMatches = this.getTodaysMatches.bind(this);

    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_CODE);
    ReactGA.pageview('/');
  }

  changeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  changeSwitch() {
    this.setState({
      passOnly: !this.state.passOnly
    });
  }

  changeStartDate(date) {
    this.setState({
      startDate: date
    });
  }

  getPrevious3daysMatches() {
    this.changeEndDate(moment().format('YYYY-MM-DD'));
    this.changeStartDate(
      moment()
        .subtract(3, 'days')
        .format('YYYY-MM-DD')
    );
  }

  getNext3DaysMatches() {
    this.changeStartDate(moment().format('YYYY-MM-DD'));
    this.changeEndDate(
      moment()
        .add(3, 'days')
        .format('YYYY-MM-DD')
    );
  }

  getNext7DaysMatches() {
    this.changeStartDate(moment().format('YYYY-MM-DD'));
    this.changeEndDate(
      moment()
        .add(7, 'days')
        .format('YYYY-MM-DD')
    );
  }

  getTodaysMatches() {
    this.changeEndDate(moment().format('YYYY-MM-DD'));
    this.changeStartDate(moment().format('YYYY-MM-DD'));
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <section className="section">
            <FilterMatchesToggle
              changeSwitch={this.changeSwitch}
              toggleOnOff={this.state.passOnly}
            />
            <div className="columns">
              <div className="column">
                <DateRangeButton
                  text={'Previous 3 Days'}
                  buttonAction={this.getPrevious3daysMatches}
                />
              </div>
              <div className="column">
                <DateRangeButton
                  text={'Today'}
                  buttonAction={this.getTodaysMatches}
                />
              </div>
              <div className="column">
                <DateRangeButton
                  text={'Next 3 days'}
                  buttonAction={this.getNext3DaysMatches}
                />
              </div>
              <div className="column">
                <DateRangeButton
                  text={'Next 7 days'}
                  buttonAction={this.getNext7DaysMatches}
                />
              </div>
            </div>
          </section>
          {this.state.startDate && (
            <Match
              dateFrom={this.state.startDate}
              dateTo={this.state.endDate}
              passOnly={this.state.passOnly}
            />
          )}
        </div>
        <Footer />
      </ApolloProvider>
    );
  }
}

export default App;
