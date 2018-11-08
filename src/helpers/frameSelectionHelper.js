export const createSelectedList = (list, selected) => {
  return list
  .filter(item => selected.length === 0 || !selected.find(selectedItem => selectedItem.upc === item.upc))
  .map((item) => ({ value: item.upc, label: item.upc }));
};

export const createSelectedFrameData = (frame) => ({ ...frame, compatibility: false });
