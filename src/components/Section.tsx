import * as React from 'react';

type ComponentProps = {
  className?: string;
  tittle: string;
  wrap?: boolean;
  children: React.ReactNode;
};

const Section: React.SFC<ComponentProps> = ({ className, tittle, wrap, children }) => {
  return (
    <section className="order-selection__section">
      <h2 className="order-selection__section-tittle">{tittle}</h2>
      {wrap
        ? <React.Fragment>{children}</React.Fragment>
        : <div className={className}>{children}</div>
      }
    </section>
  )
};

export default Section;
