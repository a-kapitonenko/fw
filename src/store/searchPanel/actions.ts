import { action } from 'typesafe-actions';
import { SearchPanelActionTypes } from './types';

export const openSearchPanel = (element: any) => action(SearchPanelActionTypes.OPEN_SEARCH_PANEL, element);
export const closeSearchPanel = () => action(SearchPanelActionTypes.CLOSE_SEARCH_PANEL);
