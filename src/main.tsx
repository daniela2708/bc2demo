import React from 'react';import ReactDOM from 'react-dom/client';import App from './App';import {PasswordGate} from './components/PasswordGate';import './styles.css';import './coverage.css';import './access.css';import './date-range.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><PasswordGate><App/></PasswordGate></React.StrictMode>);
