import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  }
}));

const menuOptions = [
  {
    action: "complete",
    primaryOption: "Show completed tasks",
    secondaryOption: "Hide completed tasks"
  }
];

const Header = ({ title, handleToggle, handleMenuClick }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Boolean to check if the user as clicked an action in the menu
  // Useful to prevent toggling of text if the menu close when
  // the user click outside the menu.
  const [menuItemSelected, setMenuItemSelected] = useState(false);

  const handleClickMore = event => {
    setAnchorEl(event.currentTarget);
    setMenuItemSelected(false);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    handleMenuClick(menuOptions[index].action);
    setMenuItemSelected(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTextSwaping = () => {
    if (menuItemSelected) {
      const optionClicked = menuOptions[selectedIndex];
      // Check if we need to change the text of the menu action
      // eslint-disable-next-line no-prototype-builtins
      if (optionClicked.hasOwnProperty("secondaryOption")) {
        // Swap the attributes value to allow showing
        // the correct text next time the moreButton is clicked
        [optionClicked.primaryOption, optionClicked.secondaryOption] = [
          optionClicked.secondaryOption,
          optionClicked.primaryOption
        ];
      }
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={handleClickMore}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onExited={handleTextSwaping}
          >
            {menuOptions.map((option, index) => (
              <MenuItem
                key={option.primaryOption}
                onClick={event => handleMenuItemClick(event, index)}
              >
                {option.primaryOption}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
