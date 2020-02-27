import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react' 

import { store, persistor } from './redux/store';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

ReactDOM.render(
   <Provider store={store}>
      <Router>
         <PersistGate persistor={persistor}>
            <App />
         </PersistGate>
      </Router>
   </Provider>
   , document.getElementById('root')
)

serviceWorker.register();

