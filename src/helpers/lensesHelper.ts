import { ApplicationState } from '../store';
import { Lens } from '../store/lenses/types';

export function getLensFromState(state: ApplicationState): Lens {
  return state.order.boss.lens;
}
