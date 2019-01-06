import React from 'react';
const OversRules = props => {
  let tag = '';

  if (props.name === 'Home Rule 1' && props.result < 10) {
    tag = 'tag is-danger';
  } else if (props.name === 'Home Rule 2' && props.result < 3) {
    tag = 'tag is-danger';
  } else if (props.name === 'Away Rule 1' && props.result < 6) {
    tag = 'tag is-danger';
  } else {
    tag = 'tag is-success';
  }

  return (
    <div className="level-item has-text-centered">
      <div>
        <p className="heading">{props.name}</p>
        <p className="title">
          <span
            className={`${tag} tooltip is-tooltip-bottom is-tooltip-multiline`}
            data-tooltip={props.info}
          >{`${props.result}`}</span>
        </p>
      </div>
    </div>
  );
};

export default OversRules;
