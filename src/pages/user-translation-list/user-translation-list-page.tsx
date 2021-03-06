import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Basic from "../../layout/basic/basic";
import LetransService from "../../services/letrans-api/letrans.service";
import UserTranslationList from "../../components/user-translation-list/user-translation-list";
import UserTranslationResponse from "../../services/letrans-api/models/response/user-translation.response";
import useUserTranslationListPageStyles from "./user-translation-list-page.styles";

const UserTranslationListPage = () => {
    const [translations, setTranslations] = useState<UserTranslationResponse[]>([]);
    const styles = useUserTranslationListPageStyles();
    const { t } = useTranslation();

    const setTranslationsList = async () => {
        const letransService = new LetransService();
        setTranslations(await letransService.translator.getUserTranslations());
    }

    useEffect(() => {
        setTranslationsList();
    }, []);

    return <Basic>
        <Typography variant="h3" className={styles.title}>{t("page.user-translation-list.title")}</Typography>

        <UserTranslationList translations={translations} />
    </Basic>;
}

export default UserTranslationListPage;