import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import LetransApiService from "../../services/letrans-api/letrans.service";
import LanguageResponse from "../../services/letrans-api/models/response/language.response";
import PropsLanguageSelectorType from "./language-selector-props.type";
import useLanguageSelectorStyles from "./language-selector.styles";

const LanguageSelector = (props: PropsLanguageSelectorType) => {
    const [languageItemsEL, setLanguageItemsEL] = useState<unknown[]>();
    const classes = useLanguageSelectorStyles();

    const setLanguageItems = async () => {
        const letransApiService: LetransApiService = new LetransApiService();
        const languages = await letransApiService.translator.getLanguages();
        const languageItems = languages.map((language: LanguageResponse) => {
            return <MenuItem value={language.id} key={language.id}>{language.name}</MenuItem>;
        });

        setLanguageItemsEL(languageItems);
    }

    useEffect(() => {
        if (!languageItemsEL) {
            setLanguageItems();
        }
    });

    return <>
        <FormControl variant="outlined" className={classes.formSelect}>
            <InputLabel id={`${props.id}-language-label`}>{props.name}</InputLabel>
            <Select labelId={`${props.id}-language`} id={`${props.id}-language-label`} label={props.name} onChange={props.onChangeFn} value={props.currentValue}>
                {languageItemsEL}
            </Select>
        </FormControl>
    </>;
}

export default LanguageSelector;
