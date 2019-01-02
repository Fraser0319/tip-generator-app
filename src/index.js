import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'bulma/css/bulma.css'
import './../node_modules/bulma-switch/dist/css/bulma-switch.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
