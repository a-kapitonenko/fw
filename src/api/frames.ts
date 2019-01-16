import request from './request';
import { Boss } from '../store/order/types';
import { Frame } from '../store/frames/types';
import {
  onSubmit,
  getSimilarFrames,
  checkFrameCompatibility
} from '../test/frames';

export const submitRequest = (
  data: {
    boss: Boss,
    frame: Frame,
  }
) => {
  return request(onSubmit, data);
}

export const fetchSimilarFramesRequest = (data : Boss) => {
  return request(getSimilarFrames, data);
}

export const checkFrameRequest = (data: Boss) => {
  return request(checkFrameCompatibility, data);
} 
