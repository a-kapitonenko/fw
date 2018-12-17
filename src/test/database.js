import { rec, lenses } from './lenses'; 
import { message, fittingHeight } from './frames';

const database = [{
  id: '6E8C896C14153342DE34BBF26F69A8135BA548864A8C838F035CB35A593C2399', 
  order: {
    prescription: {
      OD: {
        PDDistance : "1",
        PDNear : "1",
        addition : "11",
        axis : "11",
        cyclinder : "1",
        prism : "11",
        sphere : "1"
      },
      OS: {
        PDDistance : "1",
        PDNear : "1",
        addition : "11",
        axis : "11",
        cyclinder : "1",
        prism : "11",
        sphere : "1"
      }
    },
    recommendation: rec,
    message: message,
    lenses: lenses,
    fittingProperties: fittingHeight,
    selectedLens: {
      name: 'Nikon Eyes* Affinity Trivex-Clear',
      value: 4
    },
    selectedFrame: {
      'upc': '52850523738',
      'label': 'FN17116',
      'value': '52850523738',
      'img': '4.png',
      compatibility: true,
    },
    blueprint: 0,
  }
}];

export default database;
