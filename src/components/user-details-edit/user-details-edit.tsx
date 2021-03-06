import { Button, TextField, Typography, Box } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/user-context/user-context';
import NotificationService from '../../services/notifictaion-service';
import { Save } from '@material-ui/icons';
import UserResponse from '../../services/letrans-api/models/response/user.response';
import useGlobalStyles from '../../assets/global.styles';
import { useTranslation } from 'react-i18next';
import UserContextType from '../../types/user-context.type';
import LetransService from '../../services/letrans-api/letrans.service';
import useUserDetailsEditStyles from './user-details-edit.styles';

const UserDetailsEdit = () => {
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    const styles = useUserDetailsEditStyles();
    const userContext: UserContextType = useContext(UserContext);
    const [formData, setFormData] = useState<UserResponse>({
        id: String(userContext.user?.id),
        email: userContext.user?.email ?? "",
        firstname: userContext.user?.firstname ?? "",
        lastname: userContext.user?.lastname ?? "",
    });

    const handleChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData, firstname: event.currentTarget.value});
    }

    const handleChangeLastname = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData, lastname: event.currentTarget.value});
    }

    const handleForm = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        const letransService: LetransService = new LetransService();
        const notificationService: NotificationService = new NotificationService();

        if (await letransService.user.patch(formData)) {
            notificationService.addSuccess(t("success.user-updated"));
        }
    }

    return <>
        <Typography variant="h3" className={styles.title}>{t("component.user-details-edit.title")}</Typography>

        <Box>
            <form onSubmit={handleForm} className={styles.form}>
                <TextField variant="outlined" margin="normal" required fullWidth type="firstname" id="firstname" label={t("forms.user.firstname")} name="firstname" autoComplete="firstname" value={formData.firstname} onChange={handleChangeFirstname} />
                <TextField variant="outlined" margin="normal" required fullWidth type="lastname" id="lastname" label={t("forms.user.lastname")} name="lastname" autoComplete="lastname" value={formData.lastname} onChange={handleChangeLastname} />

                <Button variant="contained" color="primary" type="submit" fullWidth startIcon={<Save />} className={globalStyles.mt10}>
                    {t("component.user-details-edit.submit-button")}
                </Button>
            </form>
        </Box>
    </>;
}

export default UserDetailsEdit;