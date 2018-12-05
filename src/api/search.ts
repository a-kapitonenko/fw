import request from './request';
import { Boss } from '../store/order/types';
import { getFramesByUpc } from '../test/frames';

export const fetchFramesRequest = (data: { boss: Boss, upc: string }) => request(getFramesByUpc, data);
