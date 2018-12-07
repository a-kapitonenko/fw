import * as React from 'react';
import PropTypes from 'prop-types';

class LinkComponent<T> extends React.Component<T> {
  constructor(props: any) {
    super(props);

    this.context = props.context;
  }

  static contextTypes = {
    router: PropTypes.object
  }

  redirectToPage = (path: string) => {
    this.context.router.history.push(path)
  };
}

export default LinkComponent;
