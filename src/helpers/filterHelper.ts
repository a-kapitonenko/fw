import { Groups, Field } from '../store/filter/types';

export function createFilterGroupsData(groups: Groups): Groups {
  const newGroups: Groups = <Groups>{};

  for (const group in groups) {
    newGroups[group] = groups[group].map((field: Field) => ({ ...field, checked: false }));
  }

  return newGroups;
}

export function isEmptyNestedObject(nestedObject: object): boolean {
  for (const key in nestedObject) {
    if (nestedObject[key].length !== 0) {
      return false;
    } 
  }

  return true;
}
