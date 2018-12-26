import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Prescription, Barcode } from '../store/order/types';
import { Lens } from '../store/lenses/types';
import { Frame } from '../store/frames/types';
import PrescriptionSelection from './PrescriptionSelection';
import Section from './Section';
import '../styles/boss.css';

type ComponentProps = {
  date: string;
  prescription: Prescription;
  lens: Lens;
  frame: Frame;
  fittingHeight: number;
  barcode: Barcode;
  onClick: () => void;
  redirectToPage: (path: string) => void;
};

const Boss: React.SFC<ComponentProps> = ({ 
  date,
  prescription,
  lens, frame,
  fittingHeight,
  barcode,
  onClick,
  redirectToPage,
}) => {
  return (
    <main className="p-template__main">
      <h1 className="p-template__tittle">Scan This Document To Your System</h1>
      <div className="boss__date">{date}</div>
      <PrescriptionSelection prescription={prescription} readOnly />
      <Section className="boss__lens  s-template__content" tittle="Selected NikonEyes Lens">
        <p>{lens.name}</p>
      </Section>
      <Section tittle="Frame Information" wrap>
        <div className="boss__frame">
          <div className="boss__frame-info -flex order">
            <div className="boss__frame-des s-template__content">
              <p>UPC Code: {frame.upc}</p>
              <p>Name of Frame: {frame.label}</p>
            </div>
            <div className="boss__frame-des2 s-template__content">
              <p>Fitting Height: {fittingHeight}</p>
            </div>
          </div>
          <div className="boss__frame-img s-template__content">
            <img src={`/${frame.img}`} className="boss__img" />
          </div>
        </div>
      </Section>
      <section className="boss__barcode s-template__content">
        <img src={`/${barcode.img}`} className="boss__img" />
      </section>
      <section className="boss__actions">
        <Button className="boss__button" variant="contained" onClick={onClick}>Back</Button>
        <Button className="boss__button" variant="contained" onClick={() => redirectToPage('/')}>Main Menu</Button>
      </section>
    </main>
  );
};

export default Boss;
