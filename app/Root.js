/* Parent: ./client.js */

import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import routes from './routes';

import store from './store/redux';

export default class Root extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <Provider store={store}>      
        <ReduxRouter routes={routes(store, true)}/>          
      </Provider>
    );
  }
}

/* Child: ./routes/index.js */