import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import OversRules from './OversRules';
import MatchFixture from './MatchFixture';
import moment from 'moment';

const GET_OVERS_V3 = gql`
  query getOversResultsV3(
    $dateFrom: String
    $dateTo: String
    $passOnly: Boolean
  ) {
    getOversResultsV3(
      dateFrom: $dateFrom
      dateTo: $dateTo
      passOnly: $passOnly
    ) {
      date
      match {
        homeTeam
        awayTeam
      }
      result {
        overall
        homeRule1
        homeRule2
        awayRule1
      }
      score {
        homeTeam
        awayTeam
      }
      competition
    }
  }
`;

let counter = 0;

const Match = ({ dateFrom, dateTo, passOnly }) => (
  <Query query={GET_OVERS_V3} variables={{ dateFrom, dateTo, passOnly }}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <p id="loadingSpinner">
            <i className="fas fa-spin fa-circle-notch fa-3x" />
          </p>
        );
      if (error)
        return (
          <p>There was a problem returning match data. Please try again.</p>
        );

      if (data.getOversResultsV3.length === 0) {
        return <p>There are no matches availble during this period.</p>;
      }

      let results = data.getOversResultsV3.map(
        ({ date, match, score, result, competition }) => {
          counter++;
          let tag = '';
          let homeRule1Info = match.homeTeam + ' have had ' + result.homeRule1 + ' goals in their last 3 home games.';
          let homeRule2Info = match.homeTeam + ' had' + result.homeRule2 + ' of the 3 previous games ending over 2.5 goals.';
          let awayRule1Info = match.awayTeam + ' have had ' + result.awayRule1 + ' goals in their last 3 away games.';

          let total = score.homeTeam + score.awayTeam;
          total > 2
            ? (tag = 'tag is-large is-success')
            : (tag = 'tag is-large is-danger');
          let time = moment(date).format('HH:mm');
          date = moment(date).format('DD-MM-YYYY');

          return (
            <section key={counter} className="section">
              <div className="container is-fluid">
                <div className="box">
                  <h5 className="subtitle">{`${competition}`}</h5>
                  <h5 className="subtitle">{`${date}`}</h5>
                  <h6 className="subtitle">{`${time}`}</h6>
                  <MatchFixture match={match} score={score} tag={tag} />
                  <br />
                  <nav className="level">
                    <OversRules
                      name="Home Rule 1"
                      result={result.homeRule1}
                      info={homeRule1Info}
                    />
                    <OversRules
                      name="Home Rule 2"
                      result={result.homeRule2}
                      info={homeRule2Info}
                    />
                    <OversRules
                      name="Away Rule 1"
                      result={result.awayRule1}
                      info={awayRule1Info}
                    />
                  </nav>
                </div>
              </div>
            </section>
          );
        }
      );

      return results;
    }}
  </Query>
);

export default Match;
