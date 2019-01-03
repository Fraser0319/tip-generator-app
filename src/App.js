import React from 'react';
import './styles/App.css';
import Match from './components/Match';
// import RuleInfo from './components/RuleInfo';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import moment from 'moment';
import ReactGA from 'react-ga';

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

    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_CODE);
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
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header ">
            <h1 className="title">
              Tip-Generator<i className="fas fa-futbol" />
            </h1>
            <h2 className="subtitle">Over 2.5 goal tips</h2>
          </header>
          <section className="section">
            <div className="field">
              <input id="filterMatchesToggle" type="checkbox" name="filterMatchesToggle" className="switch is-success"
                onClick={async () => {
                  this.changeSwtich();
                }}
              />
              <label htmlFor="filterMatchesToggle">Show Matches To Bet On</label>
              
            </div>
            <div className="columns">
              <div className="column">
                <a
                  className="button is-info is-outlined is-medium is-fullwidth"
                  onClick={async () => {
                    this.changeEndDate(moment().format('YYYY-MM-DD'));
                    this.changeStartDate(
                      moment()
                        .subtract(3, 'days')
                        .format('YYYY-MM-DD')
                    );
                    ReactGA.event({
                      category: 'User',
                      action: 'Previous 3 days'
                    });
                  }}
                >
                  Previous 3 Days
                </a>
              </div>
              <div className="column">
                <a
                  className="button is-info is-outlined is-medium is-fullwidth"
                  onClick={async () => {
                    this.changeEndDate(moment().format('YYYY-MM-DD'));
                    this.changeStartDate(moment().format('YYYY-MM-DD'));
                    ReactGA.event({
                      category: 'User',
                      action: 'Today'
                    });
                  }}
                >
                  Today
                </a>
              </div>
              <div className="column">
                <a
                  className="button is-info is-outlined is-medium is-fullwidth"
                  onClick={async () => {
                    this.changeStartDate(moment().format('YYYY-MM-DD'));
                    this.changeEndDate(
                      moment()
                        .add(3, 'days')
                        .format('YYYY-MM-DD')
                    );
                    ReactGA.event({
                      category: 'User',
                      action: 'Next 3 days'
                    });
                  }}
                >
                  Next 3 Days
                </a>
              </div>
              <div className="column">
                <a
                  className="button is-info is-outlined is-medium is-fullwidth"
                  onClick={async () => {
                    this.changeStartDate(moment().format('YYYY-MM-DD'));
                    this.changeEndDate(
                      moment()
                        .add(7, 'days')
                        .format('YYYY-MM-DD')
                    );
                    ReactGA.event({
                      category: 'User',
                      action: 'Next 7 days'
                    });
                  }}
                >
                Next 7 Days
                </a>
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
      </ApolloProvider>
    );
  }
}

export default App;
