import * as React from 'react';

import LinkComponent from '../components/LinkComponent';

class PageHeader extends LinkComponent<{}>{
  public render() {
    return (
      <div className="page__header">
        <img src="/header-logo.png" onClick={() => this.redirectToPage('/')}/>
      </div>
    );
  }
}

export default PageHeader;
