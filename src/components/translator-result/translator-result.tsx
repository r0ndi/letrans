import React, { useContext } from "react";
import AddIcon from '@material-ui/icons/Add';
import { Button, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import UserContextType from "../../types/user-context.type";
import useTranslatorResultStyles from "./translator-result.styles";
import UserContext from "../../contexts/user-context/user-context";
import NotificationService from "../../services/notifictaion-service";
import TranslatorResultPropsType from "./translator-result-props.type";
import LetransService from "../../services/letrans-api/letrans.service";
import UserTranslateStatusEnum from "../../services/letrans-api/utils/user-translate-status.enum";

const TranslatorResult = (props: TranslatorResultPropsType) => {
    const userContext: UserContextType = useContext(UserContext);
    const styles = useTranslatorResultStyles();
    const { t } = useTranslation();

    if (props.translation === null) {
        return <></>;
    }

    const saveTranslation = async (): Promise<void> => {
        const letransService = new LetransService();
        const notificationService = new NotificationService();

        if (props.translation === null) {
            notificationService.addWarning(t("errors.data-save-error"));
            return;
        }

        const result: boolean = await letransService.translator.putUserTranslation({
            status: UserTranslateStatusEnum.NEW,
            phraseId: String(props.translation.phraseId),
            languages: [
                String(props.translation.sourceLanguage.id),
                String(props.translation.targetLanguage.id),
            ]
        });

        if (result) {
            notificationService.addSuccess(t("success.user-translation-saved"));
        } else {
            notificationService.addWarning(t("errors.data-save-error"));
        }
    }

    return <>
        <Grid container direction="row" className={styles.mainContainer}>
            <Grid item xs className={styles.translation}>
                <strong>{t('component.translator-result.translation-title')}</strong>
                {props.translation.translation}
            </Grid>

            <Grid item xs>
                <Grid container direction="row" alignItems="center" justify="flex-end">
                    <Grid item>
                        { userContext.user !== null ?
                            <Button size="small" className={styles.translationSaveBtn} color="primary" aria-label={t('component.translator-result.translation-save-btn')} onClick={saveTranslation}>
                                <AddIcon className={styles.extendedIcon} /> {t('component.translator-result.translation-save-btn')}
                            </Button>
                        :
                            <Button size="small" className={styles.translationSaveBtn} disabled aria-label={t('component.translator-result.translation-save-btn')}>
                                <AddIcon className={styles.extendedIcon} /> {t('component.translator-result.translation-save-btn')}
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>;
}

export default TranslatorResult;
