import React from 'react';
const RuleInfo = () => {
  return (
    <article class="message is-info">
      <div class="message-header">
        Rules
        <button class="delete" />
      </div>
      <div class="message-body">
        <p><strong>Home Rule 1</strong></p>
        The home team MUST have had 7 goals or MORE in their last 3 home games.
        <p><strong>Home Rule 2</strong></p>
        2 or all 3 of the 3 previous games must have ended over 2.5
        <p><strong>Away Rule 1</strong></p>
        The away team MUST have had 7 goals or MORE in their last 3 away games.
        <p><strong>Away Rule 2</strong></p>
        The PREVIOUS game... must have had 2 or more goals in total for the entire game.
        <p><strong>Away Rule 3</strong></p>
        The away team MUST have scored in 2 or 3 of the last 3 games.
        <p><strong>Away Rule 4</strong></p>
        2 or 3 of the 3 previous games must have ended over 2.5.
      </div>
    </article>
  );
};

export default RuleInfo;
