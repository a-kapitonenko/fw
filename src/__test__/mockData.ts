import { ApplicationState } from '../store';
import { OculusInfo, Prescription, Boss, Blueprint, Barcode, Errors } from '../store/order/types';
import { Frame, FramesState } from '../store/frames/types';
import { Groups, IFilterState } from '../store/filter/types';
import { Lens } from '../store/lenses/types';
import { initialValue } from '../test/database';
import { RouterState } from 'react-router-redux';
import { ISearchState } from '../store/search/types';

export const errorMessage: string = 'Error message';
export const recommendation: string = 'Based on the prescription, the lens selection will use an 8 base lenses that is 70 MM in diameter. We recommend you look for frames with a strong front curve and a small Frame ED (<60 ED)';
export const message = 'The selected parameters for frame and lens are acceptable for cotout.';
export const checkLensErrorMessage: string = "Selected lens doesn't compatibility with patient prescription. Please, select from the following lenses";
export const checkFrameErrorMessage: string = 'This lens does not accecptable with selected frame.';
export const valuesErrorMessage: string = 'Failed to load order values';

const oculusData: OculusInfo = {
  sphere: '1',
  cyclinder: '2',
  axis: '1',
  addition: '2',
  PDDistance: '1',
  PDNear: '1',
  prism: '1',
};

export const prescription: Prescription = {
  OD: oculusData,
  OS: oculusData,
};

export const lens: Lens = {
  name: 'Nikon Eyes* Advanced + Polycarbonate- Polarized Gray/Brown',
  value: 1,
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

export const frame: Frame = {
  upc: 82850553738,
  label: 'FM17116',
  value: '82850553738',
  img: '1.png',
  compatibility: true,
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

export const fittingHeight = [
  {
    name: '1',
    value: 1,
  },
  {
    name: '2',
    value: 2,
  },
];

export const blueprint: Blueprint = {
  img: '1.png',
};

export const barcode: Barcode = {
  img: '1.png',
};

export const boss: Boss = {} as Boss;
export const state: ApplicationState = {} as ApplicationState;
export const id: string = '6E8C896C14153342DE34BBF26F69A8135BA548864A8C838F035CB35A593C2399';
export const values: any = initialValue;
export const height: number = 3;

export const filledState: ApplicationState = {
  routing: {} as RouterState,
  frames: {} as FramesState,
  lenses: {
    isFetching: false,
    errors: '',
    lenses: lenses,
  },
  order: {
    isFetching: false,
    errors: <Errors>{},
    redirect: false,
    fittingProperties: [],
    recommendation: '',
    message: '',
    blueprint: <Blueprint>{},
    boss: <Boss>{
      prescription: prescription,
      fittingHeight: 0,
      frame: frame,
      lens: lens,
      barcode: <Barcode>{},
    },
  },
  filter: {} as IFilterState,
  search: {} as ISearchState,
};
