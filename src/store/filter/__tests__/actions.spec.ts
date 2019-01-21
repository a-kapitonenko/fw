import { Groups } from '../types';
import { Boss } from '../../order/types';
import { Frame } from '../../frames/types';
import * as filterActions from '../actions';
import * as mockData from '../../../mockData';

describe('filter actions', () => {
  it('test filteringStart action creator', () => {
    const boss: Boss = mockData.boss;
    const query: object = {};

    expect(filterActions.filteringStart(boss, query)).toMatchSnapshot();
  });

  it('test filteringSuccess action creator', () => {
    const frames: Frame[] = mockData.frames;

    expect(filterActions.filteringSuccess(frames)).toMatchSnapshot();
  });

  it('test filteringFailed action creator', () => {
    const message: string = mockData.errorMessage;

    expect(filterActions.filteringFailed(message)).toMatchSnapshot();
  });

  it('test fetchGroupsStart action creator', () => {
    expect(filterActions.fetchGroupsStart()).toMatchSnapshot();
  });

  it('test fetchGroupsSuccess action creator', () => {
    const groups: Groups = mockData.groups;

    expect(filterActions.fetchGroupsSuccess(groups)).toMatchSnapshot();
  });

  it('test fetchGroupsFailed action creator', () => {
    expect(filterActions.fetchGroupsFailed(mockData.errorMessage)).toMatchSnapshot();
  });

  it('test changeChecked action creator', () => {
    const type: string = 'color';
    const name: string = 'Black';
    const value: boolean = true;

    expect(filterActions.changeChecked(type, name, value)).toMatchSnapshot();
  });

  it('test clearChecked action creator', () => {
    expect(filterActions.clearChecked()).toMatchSnapshot();
  });

  it('test addQuery action creator', () => {
    const type: string = 'color';
    const value: any = 'test';

    expect(filterActions.addQuery(type, value)).toMatchSnapshot();
  });

  it('test deleteQuery action creator', () => {
    const type: string = 'color';
    const value: any = 'test';

    expect(filterActions.deleteQuery(type, value)).toMatchSnapshot();
  });

  it('test clearQuery action creator', () => {
    expect(filterActions.clearQuery()).toMatchSnapshot();
  });

  it('test clearResult action creator', () => {
    expect(filterActions.clearResult()).toMatchSnapshot();
  });
});
