import React, { useContext } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import useGlobalStyles from "../../assets/global.styles";
import { Typography, Button } from "@material-ui/core";
import useApplicationTitleStyles from "./application-title.styles";
import UserContextType from "../../types/user-context.type";
import UserContext from "../../contexts/user-context/user-context";
import UserMenu from "../user-menu/user-menu";
import { Home } from "@material-ui/icons";

const ApplicationTitle = () => {
    const userContext: UserContextType = useContext(UserContext);
    const classes = useApplicationTitleStyles();
    const globalClasses = useGlobalStyles();
    const { t } = useTranslation();
    const history = useHistory();

    return <>
        <Typography variant="h1" className={classes.mainHeader}>{t("component.application-title.title")}</Typography>
        <Typography variant="h2" className={classes.headerDescription}>{t("component.application-title.title-description")}</Typography>

        {
            userContext.user === null
            ?   <>
                    <Button variant="contained" color="primary" className={globalClasses.mt2l10} onClick={() => history.push('home')}><Home /></Button>
                    <Button variant="contained" color="primary" className={globalClasses.mt2l10} onClick={() => history.push('login')}>{t("component.application-title.btn.sign-in")}</Button>
                    <Button variant="contained" color="default" className={clsx(globalClasses.mt2l10, globalClasses.whiteBackground)} onClick={() => history.push('register')}>{t("component.application-title.btn.create-account")}</Button>
                </>
            :   <>
                    <Button variant="contained" color="default" className={globalClasses.mt2l10} onClick={() => history.push('home')}><Home /></Button>
                    <UserMenu />
                    <Button variant="contained" color="primary" className={globalClasses.mt2l10} onClick={() => history.push('/user-translation/list')}>{t("component.application-title.btn.translations")}</Button>
                    <Button variant="contained" color="default" className={clsx(globalClasses.mt2l10, globalClasses.whiteBackground)} onClick={() => history.push('/tranlator/quiz')}>{t("component.application-title.btn.quiz")}</Button>
                </>
        }
    </>;
}

export default ApplicationTitle;
