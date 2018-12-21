import { Frame } from '../store/frames/types';
import { Groups } from '../store/filter/types';

export const errorMessage: string = 'Error message';

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
