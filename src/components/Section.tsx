import * as React from 'react';

type ComponentProps = {
  className?: string;
  tittle: any;
  wrap?: boolean;
  children: React.ReactNode;
};

const Section: React.SFC<ComponentProps> = ({ className, tittle, wrap, children }) => {
  return (
    <section className="s-template">
      <h2 className="s-template__tittle">{tittle}</h2>
      {wrap
        ? <React.Fragment>{children}</React.Fragment>
        : <div className={className}>{children}</div>
      }
    </section>
  )
};

export default Section;
