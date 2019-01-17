import * as React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import PageHeader from './containers/PageHeader';
import Menu from './containers/Menu';
import OrderSelection from './containers/OrderSelectionСontainer';
import Boss from './containers/BossContainer';
import './styles/index.css';

class App extends React.Component {
  render() {
    return (
      <div className="p-template yellow-section">
        <HashRouter>
          <React.Fragment>
            <PageHeader />
              <Switch>
                <Route exact path="/" component={Menu} />
                <Route path="/select" component={OrderSelection} />
                <Route path="/order" component={Boss} />
              </Switch>
          </React.Fragment>
        </HashRouter>
      </div>
    );
  }
}

export default App;
