import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import { StateProvider } from './store';
import App from './components/App';
    
ReactDOM.render((
    <StateProvider>
        <App />
    </StateProvider>
), document.getElementById('root'));