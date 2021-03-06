import React from "react";
import { Container, Typography } from "@material-ui/core"
import Basic from "../../layout/basic/basic"
import { useTranslation } from "react-i18next";
import TranslatorQuizForm from "../../components/translator-quiz-form/translator-quiz-form";
import useTranslatorQuizPageStyles from "./translator-quiz-page.styles";

const TranslatorQuizPage = () => {
    const { t } = useTranslation();
    const styles = useTranslatorQuizPageStyles();

    return <Basic>
        <Typography variant="h3" className={styles.title}>{t('page.translator-quiz.title')}</Typography>

        <Container>
            <TranslatorQuizForm />
        </Container>
    </Basic>
}

export default TranslatorQuizPage;
