export const enum SearchPanelActionTypes {
  OPEN_SEARCH_PANEL = '@@frames/OPEN_SEARCH_PANEL',
  CLOSE_SEARCH_PANEL = '@@frames/CLOSE_SEARCH_PANEL',
  SET_ANCHOR = '@@frames/SET_ANCHOR',
}

export interface SearchPanelState {
  readonly open: boolean;
  readonly anchor: any
}
