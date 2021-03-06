import { Grid, TextField, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useTranslatorFormStyles from "./translator-form.styles";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "../language-selector/language-selector";
import LetransService from "../../services/letrans-api/letrans.service";
import TranslatePhraseRequestType from "../../services/letrans-api/models/request/translate-phrase.request";
import NullableType from "../../types/nullable.type";
import TranslatorResult from "../translator-result/translator-result";
import TranslatePhraseResponse from "../../services/letrans-api/models/response/translate-phrase.response";

const TranslatorForm = () => {
    const [formData, setFormData] = useState<TranslatePhraseRequestType>({targetLanguage: "", sourceLanguage: "", phrase: ""});
    const [phraseResult, setPhraseResult] = useState<NullableType<TranslatePhraseResponse>>(null);
    const letransService: LetransService = new LetransService();
    const classes = useTranslatorFormStyles();
    const { t } = useTranslation();

    const onChangeSourceLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({...formData, sourceLanguage: event.target.value as string});
    }

    const onChangeTargetLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({...formData, targetLanguage: event.target.value as string});
    }

    const onChangePhrase = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({...formData, phrase: event.currentTarget.value as string});
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            sumbitForm();
        }
    }

    const sumbitForm = async () => {
        setPhraseResult(null);
        const translateResult: NullableType<TranslatePhraseResponse> = await letransService.translator.translate(formData);
        if (translateResult !== null) {
            setPhraseResult(translateResult);
        }
    }

    const setDefaultLanguages = async () => {
        const sourceLanguage = await letransService.getDefaultLanguage();
        const targetLanguage = await letransService.getDefaultLanguage(sourceLanguage);

        if (targetLanguage && sourceLanguage) {
            setFormData({...formData, targetLanguage: targetLanguage.id, sourceLanguage: sourceLanguage.id});
        }
    }

    useEffect(() => {
        if (!formData.targetLanguage && !formData.sourceLanguage) {
            setDefaultLanguages();
        }
    });

    return (
        <Grid container spacing={2} className={classes.form}>
            <Grid item xs={12} md={6}>
                <LanguageSelector onChangeFn={onChangeSourceLanguage} currentValue={formData.sourceLanguage} name={t("forms.translator.sourceLanguage")} id="source" />
            </Grid>

            <Grid item xs={12} md={6}>
                <LanguageSelector onChangeFn={onChangeTargetLanguage} currentValue={formData.targetLanguage} name={t("forms.translator.targetLanguage")} id="target" />
            </Grid>

            <Grid item xs={12}>
                <TextField variant="outlined" margin="normal" fullWidth type="phrase" id="phrase" label={t("forms.translator.phrase")} name="phrase" autoComplete="phrase" value={formData.phrase} autoFocus onChange={onChangePhrase} onKeyDown={onKeyDown} />
            </Grid>

            <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={sumbitForm}>{t("forms.translator.submit")}</Button>
            </Grid>

            <TranslatorResult translation={phraseResult} />
        </Grid>
    );
}

export default TranslatorForm;
