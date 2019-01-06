import React from 'react';
import './styles/App.css';
import Match from './components/Match';
import DateRangeButton from './components/DateRangeButton';
// import RuleInfo from './components/RuleInfo';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import moment from 'moment';
import ReactGA from 'react-ga';
import Footer from './components/Header';

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
    this.changeSwtich = this.changeSwtich.bind(this);
    this.getPrevious3daysMatches = this.getPrevious3daysMatches.bind(this);
    this.getNext3DaysMatches = this.getNext3DaysMatches.bind(this);
    this.getNext7DaysMatches = this.getNext7DaysMatches.bind(this);
    this.getTodaysMatches = this.getTodaysMatches.bind(this);

    ReactGA.initialize('UA-131667366-1');
    ReactGA.pageview('/');
  }

  changeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  changeSwtich() {
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
          <header className="App-header ">
            <h1 className="title">
              Tip-Generator
              <i className="fas fa-futbol" />
            </h1>
            <h2 className="subtitle">Over 2.5 goal tips</h2>
          </header>
          <section className="section">
            <div className="field">
              <input
                id="filterMatchesToggle"
                type="checkbox"
                name="filterMatchesToggle"
                className="switch is-success"
                onClick={async () => {
                  this.changeSwtich();
                }}
              />
              <label htmlFor="filterMatchesToggle">
                Show Matches To Bet On
              </label>
            </div>
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
