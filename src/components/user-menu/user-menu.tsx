import React, { useContext, useState, MouseEvent } from 'react';
import { ExitToApp, AssignmentInd, Person, Delete } from '@material-ui/icons';
import StyledMenu from '../styled-menu/styled-menu';
import { Button, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import AuthService from '../../services/auth.service';
import UserContext from '../../contexts/user-context/user-context';
import useUserMenuStyles from './user-menu.styles';
import useGlobalStyles from '../../assets/global.styles';
import NotificationService from '../../services/notifictaion-service';
import UserContextType from '../../types/user-context.type';
import { useTranslation } from 'react-i18next';
import LetransApiService from '../../services/letrans-api/letrans.service';
import NullableType from '../../types/nullable.type';

const UserMenu = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const globalStyles = useGlobalStyles();
  const userMenuStyles = useUserMenuStyles();
  const userContext: UserContextType = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<NullableType<HTMLElement>>(null);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const logOutHandler = (): void => {
    localStorage.setItem(AuthService.STORAGE_ACCESS_TOKEN, "");
    userContext.setUser(null);

    if (history) {
        history.push("/home");
    }
  };

  const deleteUser = async (): Promise<void> => {
    const letransApiService: LetransApiService = new LetransApiService();
    const notificationService: NotificationService = new NotificationService();

    if (await letransApiService.user.delete(userContext.user?.id ?? "")) {
      notificationService.addSuccess(t("success.user-has-been-deleted"));
      localStorage.setItem(AuthService.STORAGE_ACCESS_TOKEN, "");
      userContext.setUser(null);

      if (history) {
          history.push("/home");
      }
    }
  }

  return <>
    <Button aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="primary" onClick={handleClick} className={globalStyles.mt2l10}>
        <Person />
    </Button>

    <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem>
        <ListItemIcon className={userMenuStyles.linkItem}>
          <AssignmentInd fontSize="small" />
        </ListItemIcon>

        <Link to="/user/details" className={globalStyles.link}>
          <ListItemText primary={t("component.user-menu.account-details")} />
        </Link>
      </MenuItem>

      <MenuItem>
        <ListItemIcon className={userMenuStyles.linkItem}>
          <Delete fontSize="small" />
        </ListItemIcon>

        <ListItemText primary={t("component.user-menu.account-delete")} onClick={deleteUser} />
      </MenuItem>

      <MenuItem>
        <ListItemIcon className={userMenuStyles.linkItem}>
          <ExitToApp fontSize="small" />
        </ListItemIcon>

        <ListItemText primary={t("component.user-menu.logout")} onClick={logOutHandler} />
      </MenuItem>
    </StyledMenu>
  </>;
}

export default UserMenu;
