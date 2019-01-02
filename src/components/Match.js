import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import OversRules from './OversRules';
import MatchFixture from './MatchFixture';
import moment from 'moment';

const GET_OVERS = gql`
  query getOversResults($dateFrom: String, $dateTo: String){
    getOversResults(dateFrom: $dateFrom , dateTo: $dateTo) {
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
        awayRule2
        awayRule3
        awayRule4
      }
      rule
      score {
        homeTeam
        awayTeam
      }
      competition
    }
  }
  `;


const GET_OVERS_V3 = gql`
query getOversResultsV3($dateFrom: String, $dateTo: String, $passOnly: Boolean){
  getOversResultsV3(dateFrom: $dateFrom , dateTo: $dateTo, passOnly: $passOnly) {
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

  const GET_UNDERS = gql`
  query getUndersResults($dateFrom: String, $dateTo: String){
    getUndersResults(dateFrom: $dateFrom , dateTo: $dateTo) {
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
        awayRule2
      }
      score {
        homeTeam
        awayTeam
      }
    }
  }
  `;

let counter = 0;

const Match = ({dateFrom, dateTo, passOnly}) => (
  <Query query={GET_OVERS_V3} variables={{ dateFrom, dateTo, passOnly }}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <p id="loadingSpinner">
            <i className="fas fa-spin fa-circle-notch fa-4x" />
            {/* <img src="/Users/fraserbeaton/Personal/React/tip-generator/assests/images/line-chart/animat-linechart-color.gif" /> */}
          </p>
        );
      if (error) return <p>Error :(</p>;
        
      let results = data.getOversResultsV3.map(
        ({ date, match, score, result, competition }) => {
          counter++;
          let tag = '';
          let homeRule1Info = match.homeTeam + ' have had ' + result.homeRule1 + ' goals in their last 3 home games.';
          let homeRule2Info = match.homeTeam + ' had' + result.homeRule2 + ' of the 3 previous games ending over 2.5 goals.';
          let awayRule1Info = match.awayTeam + ' have had ' + result.awayRule1 + ' goals in their last 3 away games.';
          let awayRule2Info = 'In the previous game, ' + match.awayTeam + ' had ' + result.awayRule2 + ' goals in total for the entire game.';
          let awayRule3Info = match.awayTeam + 'have scored in ' + result.awayRule3 + ' of the last 3 games.';
          let awayRule4Info = match.awayTeam + ' had '+ result.awayRule4 + ' of the 3 previous games ending over 2.5 goals.';

          let total = score.homeTeam + score.awayTeam;
          total > 2
            ? (tag = 'tag is-large is-success')
            : (tag = 'tag is-large is-danger');
          let time = moment(date).format("HH:mm");
          date = moment(date).format("DD-MM-YYYY");

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
                    <OversRules name="Home Rule 1" result={result.homeRule1} info={homeRule1Info} />
                    <OversRules name="Home Rule 2" result={result.homeRule2} info={homeRule2Info} />
                    <OversRules name="Away Rule 1" result={result.awayRule1} info={awayRule1Info} />
                    {/* <OversRules name="Away Rule 2" result={result.awayRule2} info={awayRule2Info} />
                    <OversRules name="Away Rule 3" result={result.awayRule3} info={awayRule3Info} />
                    <OversRules name="Away Rule 4" result={result.awayRule4} info={awayRule4Info} /> */}
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
