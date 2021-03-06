import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LetransService from "../../services/letrans-api/letrans.service";
import UserTranslationLanguageResponse from "../../services/letrans-api/models/response/user-translation-language.response";
import UserTranslationResponse from "../../services/letrans-api/models/response/user-translation.response";
import UserTranslateStatusEnum from "../../services/letrans-api/utils/user-translate-status.enum";
import NotificationService from "../../services/notifictaion-service";
import NullableType from "../../types/nullable.type";
import useTranslatiorQuizFormStyles from "./translator-quiz-form.styles";

const TranslatorQuizForm = () => {
    const { t } = useTranslation();
    const letransService = new LetransService();
    const translatiorQuizFormStyles = useTranslatiorQuizFormStyles();

    const [formTranslation, setFormTranslation] = useState<string>("");
    const [translations, setTranslations] = useState<UserTranslationResponse[]>([]);
    const [numberPhraseToTranslate, setNumberPhraseToTranslate] = useState<number>(0);
    const [selectedTranslation, setSelectedTranslation] = useState<NullableType<UserTranslationResponse>>(null);

    useEffect(() => {
        if (!translations || translations.length <= 0) {
            setUserTranslations();
        }
    }, []);

    const handleFormTranslation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormTranslation(event.currentTarget.value);
    }

    const setUserTranslations = async () => {
        const userTranslations = await letransService.translator.getUserTranslations();
        const translations = userTranslations.filter((userTranslation: UserTranslationResponse) => userTranslation.status !== UserTranslateStatusEnum.DONE);

        if (translations.length > 0) {
            setTranslations(translations);
            setRandomPhrase(translations);
        }
    }

    const setRandomPhrase = (userTranslations: NullableType<UserTranslationResponse[]> = null) => {
        const phrases: UserTranslationResponse[] = userTranslations !== null ? userTranslations : translations;
        const randomNumber: number = Math.floor(Math.random() * phrases.length);
        if (!(randomNumber in phrases)) {
            setSelectedTranslation(null);
            return;
        }

        const userTranslation: UserTranslationResponse = phrases[randomNumber];
        setNumberPhraseToTranslate(randomNumber % 2 === 0 ? 1 : 0);
        setSelectedTranslation(userTranslation);
    }

    const getNewTranslationStatus = (userTranslation: UserTranslationResponse, result: boolean): UserTranslateStatusEnum => {
        if (!result) {
            return UserTranslateStatusEnum.ERROR;
        }

        if (userTranslation.status === UserTranslateStatusEnum.ERROR) {
            return UserTranslateStatusEnum.TRIED;
        }

        if (userTranslation.status === UserTranslateStatusEnum.NEW) {
            return UserTranslateStatusEnum.TRIED;
        }

        return UserTranslateStatusEnum.DONE;
    }

    const checkTranlsation = (): boolean => {
        if (!selectedTranslation) {
            return false;
        }

        return selectedTranslation.phrase.translations[Math.abs(numberPhraseToTranslate - 1)].translation === formTranslation;
    }

    const handleForm = (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedTranslation) {
            return;
        }

        const letransService = new LetransService();
        const notificationService = new NotificationService();
        const translationResult: boolean = checkTranlsation();

        if (translationResult) {
            notificationService.addSuccess(t('component.translator-quiz-form.correct-translation'));
        } else {
            notificationService.addDanger(t('component.translator-quiz-form.invalid-translation'));
        }

        const userTranslations = translations.filter((userTranslation: UserTranslationResponse) => userTranslation.id !== selectedTranslation.id);
        letransService.translator.putUserTranslation({
            phraseId: selectedTranslation.phrase.id,
            status: getNewTranslationStatus(selectedTranslation, translationResult),
            languages: selectedTranslation.languages.map((language: UserTranslationLanguageResponse) => language.id),
        });

        setTranslations(userTranslations);
        setRandomPhrase(userTranslations);
        setFormTranslation('');
    }

    if (!selectedTranslation) {
        return <Typography variant="body1" className={translatiorQuizFormStyles.title}>{t('component.translator-quiz-form.translations-not-found')}</Typography>;
    }

    return <>
        <Box>
            <form onSubmit={handleForm} className={translatiorQuizFormStyles.form}>
                <Grid>
                    <Typography>{t('component.translator-quiz-form.form-title')} <strong>{selectedTranslation.phrase.translations[numberPhraseToTranslate].translation}</strong></Typography>
                </Grid>

                <TextField variant="outlined" margin="normal" required fullWidth type="text" label={t("forms.translator-quiz.translation")} name="translation" value={formTranslation} autoFocus onChange={handleFormTranslation} />
                <Button type="submit" fullWidth variant="contained" color="primary">{t("forms.translator-quiz.submit")}</Button>
            </form>
        </Box>
    </>;
}

export default TranslatorQuizForm;
