import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

class localStorageMock {
  store = {};
  setItem = (key, val) => (this.store[key] = val);
  getItem = key => this.store[key];
  removeItem = key => { delete this.store[key]; };
  clear = () => (this.store = {});
};

global.localStorage = new localStorageMock;

configure({ adapter: new Adapter() });