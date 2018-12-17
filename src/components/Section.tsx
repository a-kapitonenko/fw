import * as React from 'react';

type ComponentProps = {
  className?: string;
  tittle: any;
  errors?: string;
  wrap?: boolean;
  children: React.ReactNode;
};

const Section: React.SFC<ComponentProps> = ({ className, tittle, errors, wrap, children }) => {
  const renderChildren = (
    <React.Fragment>
      {errors && <div className="order-selection__error">{errors}</div>}
      {children}
    </React.Fragment>
  );

  return (
    <section className="s-template">
      <h2 className="s-template__tittle">{tittle}</h2>
      {wrap
        ? <React.Fragment>{renderChildren}</React.Fragment>
        : <div className={className}>{renderChildren}</div>
      }
    </section>
  )
};

export default Section;
