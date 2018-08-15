import React from 'react';

const MatchFixture = (props) => {
  return (
    <div className="columns">
      <div className="column">
        <p id="homeTeamTitle" className="title is-4 is-spaced">
          {`${props.match.homeTeam}`}
        </p>
      </div>
      <div className="column">
        <p id="scoreTitle" className="title is-4 is-spaced">
          <span id="matchTitle" className={`${props.tag}`}>
            {props.score.homeTeam != null
              ? props.score.homeTeam + ' - ' + props.score.awayTeam
              : 'To Be Played'}
          </span>
        </p>
      </div>
      <div className="column">
        <p id="awayTeamTitle" className="title is-4 is-spaced">
          {`${props.match.awayTeam}`}
        </p>
      </div>
    </div>
  );
};

export default MatchFixture;
