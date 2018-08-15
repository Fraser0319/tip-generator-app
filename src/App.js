import React from 'react';
import './styles/App.css';
import Match from './components/Match';
import RuleInfo from './components/RuleInfo';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const client = new ApolloClient({
  // uri: 'https://tip-generator-dev.herokuapp.com/graphql'
  uri: 'http://localhost:5000/graphql'
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
  }

  changeEndDate(date) {
    this.setState({
      endDate: date
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
              Tip-Generator <i className="fas fa-futbol" />
            </h1>
            <h2 className="subtitle">Over 2.5 goal tips</h2>
          </header>
          {/* <RuleInfo /> */}

          <section className="section">
            <div className="columns">
              <div className="column">
                <a
                  className="button is-info is-medium is-fullwidth"
                  onClick={async () => {
                    this.changeEndDate(moment().format('YYYY-MM-DD'));
                    this.changeStartDate(
                      moment()
                        .subtract(3, 'days')
                        .format('YYYY-MM-DD')
                    );
                  }}
                >
                  Previous 3 Days
                </a>
              </div>
              <div className="column">
                <a
                  className="button is-info is-medium is-fullwidth"
                  onClick={async () => {
                    this.changeEndDate(moment().format('YYYY-MM-DD'));
                    this.changeStartDate(moment().format('YYYY-MM-DD'));
                  }}
                >
                  Today
                </a>
              </div>
              <div className="column">
                <a
                  className="button is-info is-medium is-fullwidth"
                  onClick={async () => {
                    this.changeStartDate(moment().format('YYYY-MM-DD'));
                    this.changeEndDate(
                      moment()
                        .add(3, 'days')
                        .format('YYYY-MM-DD')
                    );
                  }}
                >
                  Next 3 Days
                </a>
              </div>
              <div className="column">
                <a
                  className="button is-info is-medium is-fullwidth"
                  onClick={async () => {
                    this.changeStartDate(moment().format('YYYY-MM-DD'));
                    this.changeEndDate(
                      moment()
                        .add(14, 'days')
                        .format('YYYY-MM-DD')
                    );
                  }}
                >
                  Next 5 Days
                </a>
              </div>
            </div>
          </section>

          {this.state.startDate && (
            <Match
              dateFrom={this.state.startDate}
              dateTo={this.state.endDate}
            />
          )}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
