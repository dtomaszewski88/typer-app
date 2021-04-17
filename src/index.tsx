import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppContainer from './container';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './app/store';


ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
        <> { /* your usual react-router v4/v5 routing */ }
          <Switch>
            <Route component={AppContainer} exact path="/"/>
            <Route render={() => (<div>Miss</div>)} />
          </Switch>
        </>
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
