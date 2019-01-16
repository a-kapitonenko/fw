import request from './request';
import { getFilterGroups, getFilterFrames } from '../test/frames';

export const fetchGroupsRequest = () => {
  return request(getFilterGroups);
}

export const fetchFramesRequest = (data: any) => {
  return request(getFilterFrames, data);
};
