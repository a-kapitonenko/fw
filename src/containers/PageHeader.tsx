import * as React from 'react';
import * as routes from '../constants/routes';
import LinkComponent from '../components/LinkComponent';

class PageHeader extends LinkComponent<{}>{
  public render() {
    return (
      <div className="page__header">
        <img src="./header-logo.png" onClick={() => this.redirectToPage(routes.HOME)}/>
      </div>
    );
  }
}

export default PageHeader;
