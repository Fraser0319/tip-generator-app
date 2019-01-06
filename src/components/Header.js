import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="App-header ">
        <h1 className="title">
          Tip-Generator
          <i className="fas fa-futbol" />
        </h1>
        <h2 className="subtitle">Over 2.5 goal tips</h2>
      </header>
    );
  }
}

export default Header;
