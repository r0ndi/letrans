import { Chip } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import LetransService from "../../services/letrans-api/letrans.service";
import NotificationService from "../../services/notifictaion-service";
import UserTranslationDeleteProps from "./user-translation-delete-props.type";

const UserTranslationDelete = (props: UserTranslationDeleteProps) => {
    const { t } = useTranslation();

    const handleDelete = async () => {
        const letransService = new LetransService();
        const notificationService = new NotificationService();
        const result = await letransService.translator.deleteUserTranslation(props.id);

        if (result) {
            notificationService.addSuccess(t('success.user-translation-deleted'));
        } else {
            notificationService.addDanger(t('errors.error-occured'));
        }
    }

    return <Chip size="small" clickable label={t('component.user-translation-list.action-delete')} onDelete={handleDelete} color="secondary" />;
}

export default UserTranslationDelete;
