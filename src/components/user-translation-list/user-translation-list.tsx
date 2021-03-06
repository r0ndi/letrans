import React from 'react';
import { TableContainer, TableBody, TableCell, TableHead, TableRow, Table, Paper, Container } from '@material-ui/core';
import UserTranslationResponse from "../../services/letrans-api/models/response/user-translation.response";
import UserTranslationListPropsType from "./user-translation-list-props.type";
import useUserTranslationListStyles from './user-translation-list.styles';
import PhraseResponse from '../../services/letrans-api/models/response/phrase.response';
import UserTranslateStatusEnum from '../../services/letrans-api/utils/user-translate-status.enum';
import { useTranslation } from "react-i18next";
import UserTranslateStatus from '../user-translate-status/user-translate-status';
import UserTranslationDelete from '../user-translation-delete/user-translation-delete';

const UserTranslationList = (props: UserTranslationListPropsType) => {
    const stlyes = useUserTranslationListStyles();
    const { t } = useTranslation();

    const translations = props.translations
        .filter((userTranslation: UserTranslationResponse) => userTranslation.status !== UserTranslateStatusEnum.DELETED)
        .map((userTranslation: UserTranslationResponse) => {
            const targetTranslation: PhraseResponse = userTranslation.phrase;
            const sourceTranslation: PhraseResponse = userTranslation.phrase;

            return {
                id: userTranslation.id,
                status: userTranslation.status,
                targetTranslation: targetTranslation.translations[0].translation,
                sourceTranslation: sourceTranslation.translations[1].translation,
            };
        });

    return <Container className={stlyes.container}>
      <TableContainer component={Paper}>
        <Table className={stlyes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('component.user-translation-list.header-source-translation')}</TableCell>
              <TableCell>{t('component.user-translation-list.header-target-translation')}</TableCell>
              <TableCell>{t('component.user-translation-list.header-status')}</TableCell>
              <TableCell>{t('component.user-translation-list.header-action')}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {translations.map(translation => (
              <TableRow key={translation.id}>
                <TableCell>{translation.targetTranslation}</TableCell>
                <TableCell>{translation.sourceTranslation}</TableCell>
                <TableCell><UserTranslateStatus status={translation.status} /></TableCell>
                <TableCell><UserTranslationDelete  id={translation.id} /></TableCell>
              </TableRow>
            ))}
            {
                translations.length > 0 ? null :
                (<TableRow key={0}><TableCell colSpan={4} align="center">{t('component.user-translation-list.not-found')}</TableCell></TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>;
}

export default UserTranslationList;
