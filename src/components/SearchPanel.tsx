import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { Frame } from '../store/frames/types';

export interface Props {
  list: Frame[],
  open: boolean,
  anchorEl: any,
  handleClose: any,
}

const SearchPanel = ({ list, open, anchorEl, handleClose }: Props) => (
  <Popper open={open} anchorEl={anchorEl} transition disablePortal>
    {({ TransitionProps, placement }) => (
      <Grow
        {...TransitionProps}
        style={{ transformOrigin: placement === 'bottom' ? 'begin top' : 'left bottom' }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              {/* {list.map((item: Frame) => (
                <MenuList>
                  <div>{item.name}</div>
                  <div>{item.upc}</div>
                  <div>{item.img}</div>
                </MenuList>
              ))} */}
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
  </Popper>
);

export default SearchPanel;