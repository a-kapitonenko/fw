import * as React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import PageHeader from './containers/PageHeader';
import Home from './containers/OrderSelection';
import BossContainer from './containers/BossContainer';

import './styles/index.css';

class App extends React.Component {
  render() {
    return (
      <div className="page__wrapper yellow-section">
        <BrowserRouter>
          <React.Fragment>
            <PageHeader />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/order" component={BossContainer}/>
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
