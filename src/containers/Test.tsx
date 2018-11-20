import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { components } from 'react-select';
// import AsyncSelect from 'react-select/lib/Async';

import { ApplicationState } from '../store';
import { IOrderState } from '../store/order/types';
import { Frame } from '../store/frames/types';
import * as framesActions from '../store/frames/actions';

type PropsFromState = {
  order: IOrderState;
  fetching: boolean;
  list: Frame[];
  errors: string;
}

type PropsFromDispatch = {
  handleFetch: typeof framesActions.fetchFramesByUPC,
}

type ComponentProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = (state: ApplicationState) => ({
  order: state.order,
  fetching: state.frames.UPCSearch.fetching,
  list: state.frames.UPCSearch.list,
  errors: state.frames.UPCSearch.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFetch: (upc: string) => dispatch(framesActions.fetchFramesByUPC(upc)),
});

// export const colourOptions = [
//   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true, img: '1.png' },
//   { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true, img: '2.png' },
//   { value: 'purple', label: 'Purple', color: '#5243AA', img: '3.png' },
//   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//   { value: 'orange', label: 'Orange', color: '#FF8B00' },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//   { value: 'green', label: 'Green', color: '#36B37E' },
//   { value: 'forest', label: 'Forest', color: '#00875A' },
//   { value: 'slate', label: 'Slate', color: '#253858' },
//   { value: 'silver', label: 'Silver', color: '#666666' },
// ];

// type State = {
//   inputValue: string,
// };

// const filterColors = (inputValue: string) => {
//   if (inputValue) {
//     return colourOptions.filter(i =>
//         i.label.toLowerCase().includes(inputValue.toLowerCase())
//       );
//   }
//   return;
// };

// const promiseOptions = (inputValue: string) => {
//   if (inputValue.length >= 2) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(filterColors(inputValue));
//       }, 1000);
//     });
//   }

//   return ;
// }

const NoOptionsMessage = (props: any) => {
  return (
    <div>
      <components.NoOptionsMessage {...props} />
    </div>
  );
};

const Option = (props: any) => {
  return (
    <div className="huy" style={{ border: "1px solid black" }}>
      <components.Option {...props}>

        {props.data.img && <img src={`/${props.data.img}`} />}

        {props.children}
      </components.Option>
    </div>
  );
};

const Menu = (props: any) => {
  return <components.Menu {...props} />
}

const DropdownIndicator = (props: any) => {
  return components.DropdownIndicator && (
    <div />
  );
};

const IndicatorSeparator = ({ innerProps }: any) => {
  return (
    <span />
  );
};

class AsyncMulti extends React.Component<ComponentProps> {
  state = { inputValue: '', menu: false, load: false };

  render() {
    const { list, fetching, handleFetch } = this.props;
    console.log(list);

    return ( 
      <Select
        isLoading={fetching}
        openMenuOnClick={false}
        isMulti
        onChange={(props: any) => {
          console.log(props);
          return props;
        }}
        onBlur={(a: any)=> {
          console.log(a);
          if (this.state.menu) {
            this.setState({menu: false})
          }
        }}
        // menuIsOpen={this.state.menu}
        components={{ Menu, Option, IndicatorSeparator, DropdownIndicator, NoOptionsMessage }}
        options={list}
        onInputChange={(props: string) => {
          if (props.length >= 3) {
            handleFetch(props);

            this.setState({menu: true});
          } else if (this.state.menu) {
            this.setState({menu: false});
          }
          return props;
        }}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncMulti);

// export default () => (
//   <Select
//     closeMenuOnSelect={false}
//     components={{ Menu, Option, IndicatorSeparator, DropdownIndicator }}
//     defaultValue={[colourOptions[4], colourOptions[5]]}
//     isMulti
//     options={colourOptions}
//   />
// );
