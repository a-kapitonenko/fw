import { Frame } from '../store/frames/types';
import { Groups } from '../store/filter/types';
import { OculusInfo, Prescription } from '../store/order/types';
import { Lens } from '../store/lenses/types';

const oculusData: OculusInfo = {
  sphere: '1',
  cyclinder: '2',
  axis: '1',
  addition: '2',
  PDDistance: '1',
  PDNear: '1',
  prism: '1',
};

export const errorMessage: string = 'Error message';

export const prescription: Prescription = {
  OD: oculusData,
  OS: oculusData,
};

export const lenses: Lens[] = [
  {
    name: 'Nikon Eyes* Advanced + Polycarbonate- Polarized Gray/Brown',
    value: 1
  },
  {
    name: 'Nikon Eyes* Advanced + Polycarbonate- Transitions* Signature VII',
    value: 2
  },
  {
    name: 'Nikon Eyes* Advanced + Polycarbonate- XTRActive* Gray',
    value: 3
  },
];

export const lens: Lens = {
  name: 'Nikon Eyes* Advanced + Polycarbonate- Polarized Gray/Brown',
  value: 1
};

export const frames: Frame[] = [
  {
    upc: 82850553738,
    label: 'FM17116',
    value: '82850553738',
    img: '1.png',
    compatibility: true,
  },
  {
    upc: 82850523999,
    label: 'SA17346',
    value: '82850523999',
    img: '2.png',
    compatibility: false,
  },
];

export const groups: Groups = {
  color: [
    { name: 'Black', value: 'black' },
  ],
  width: [
    { name: 'Narrow', value: 'narrow' },
  ],
  noseBridge: [
    { name: 'Standard', value: 'standard' },
  ],
  shape: [
    { name: 'Square', value: 'square' },
  ],
  material: [
    { name: 'Acetate', value: 'acetate' },
  ],
};

export const query: object = {
  color: ['black', 'gold', 'brown'],
  width: ['narrow', 'medium'],
  noseBridge: ['standard'],
  shape: ['square'],
  material: ['acetate'],
};
