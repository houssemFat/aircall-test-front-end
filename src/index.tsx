import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';

import ConnectedApp from './App';
import reportWebVitals from './reportWebVitals';
import { SendToAnalytics } from "./modules/shared/utils";
import StoreProvider from './modules/shared/redux/store';

ReactDOM.render(
    <React.StrictMode>
      <StoreProvider>
        <ConnectedApp />
      </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(SendToAnalytics);
