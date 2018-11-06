import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export interface Props {
  open: boolean,
  anchorEl: any,
  handleClose: any,
}

const SearchPanel = ({ open, anchorEl, handleClose }: Props) => (
  <Popper open={open} anchorEl={anchorEl} transition disablePortal>
    {({ TransitionProps, placement }) => (
      <Grow
        {...TransitionProps}
        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              <MenuItem >Profile</MenuItem>
              <MenuItem >My account</MenuItem>
              <MenuItem >Logout</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
  </Popper>
);

export default SearchPanel;