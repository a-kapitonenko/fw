import request from './request';
import { getFilterGroups, getFilterFrames } from '../test/frames';

export const fetchGroupsRequest = () => request(getFilterGroups);
export const fetchFramesRequest = (data: any) => request(getFilterFrames, data);
