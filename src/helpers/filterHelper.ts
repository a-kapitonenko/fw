import { Groups, Field } from '../store/filter/types';

export function createFilterGroupsData(groups: Groups): Groups {
  const newGroups: Groups = <Groups>{};

  for (const group in groups) {
    newGroups[group] = groups[group].map((field: Field) => ({ ...field, checked: false }));
  }

  return newGroups;
}

export function isEmptyQuery(query: object): boolean {
  for (const item in query) {
    if (query[item].length !== 0) {
      return false;
    } 
  }

  return true;
}
