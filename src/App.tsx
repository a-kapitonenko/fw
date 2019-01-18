import * as React from 'react';
import GuardedRouter from './utils/GuardedRouter/GuardedRouter';
import './styles/index.css';

class App extends React.Component {
  render() {
    return (
      <div className="p-template yellow-section">
        <GuardedRouter />
      </div>
    );
  }
}

export default App;
