import { Menu, MenuProps } from "@material-ui/core";
import useStyledMenuStyles from "./styled-menu.styles";
import React from "react";

const StyledMenu = (props: MenuProps) => {
  const styledMenuStyles = useStyledMenuStyles();

  return <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    {...props}
    className={styledMenuStyles.paper}
  />
};

export default StyledMenu;
