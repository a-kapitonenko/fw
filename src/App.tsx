import * as React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import PageHeader from './containers/PageHeader';
import Home from './containers/OrderSelection';
import FrameSelection from './containers/FrameSelectionContainer';

import './styles/index.css';

class App extends React.Component {
  render() {
    return (
      <div className="page__wrapper yellow-section">
        <PageHeader />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/select" component={FrameSelection} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
