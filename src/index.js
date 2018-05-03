import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const numGuests = 3;

ReactDOM.render(<App count={numGuests}/>, document.getElementById('root'));
registerServiceWorker();
