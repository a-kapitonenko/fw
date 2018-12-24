import request from './request';
import { Boss } from '../store/order/types';
import { Frame } from '../store/frames/types';
import { onSubmit, getSimilarFrames, checkFrameCompatibility } from '../test/frames';

export const submitRequest = (data: { boss: Boss, frame: Frame }) => request(onSubmit, data);
export const fetchSimilarFramesRequest = (data : Boss) => request(getSimilarFrames, data);
export const checkFrameRequest = (data: Boss) => request(checkFrameCompatibility, data); 
