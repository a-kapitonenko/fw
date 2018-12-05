import request from './request';
import { Boss } from '../store/order/types';
import { Frame } from '../store/frames/types';
import { getSimilarFrames, onSubmit } from '../test/frames';

export const fetchSimilarFramesRequest = (data : Boss ) => request(getSimilarFrames, data);
export const fetchSubmitRequest = (data: { boss: Boss, frame: Frame }) => request(onSubmit, data);

