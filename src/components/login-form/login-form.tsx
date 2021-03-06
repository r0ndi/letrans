import { Button, TextField, Link, Grid, Box } from '@material-ui/core';
import useLoginFormStyles from './login-form.styles';
import AuthService from '../../services/auth.service';
import { useHistory } from "react-router-dom";
import { useContext, useState } from 'react';
import UserContext from '../../contexts/user-context/user-context';
import NotificationService from '../../services/notifictaion-service';
import { useTranslation } from 'react-i18next';
import LoginRequest from '../../services/letrans-api/models/request/login.request';

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginRequest>({email: "", password: ""});
    const userContext = useContext(UserContext);
    const classes = useLoginFormStyles();
    const { t } = useTranslation();
    const history = useHistory();

    const sumbitForm = async (): Promise<void> => {
        const authService: AuthService = new AuthService();
        const notifictaionService: NotificationService = new NotificationService();
        const loginStatus: boolean = await authService.logIn(formData);

        if (!loginStatus) {
            notifictaionService.addDanger(t("errors.invalid-creadentials"));
            return;
        }

        userContext.setUser(await authService.getLoggedUser());
        history.push("/home");
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData, email: event.currentTarget.value});
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData, password: event.currentTarget.value});
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            sumbitForm();
        }
    }

    return (
        <Box className={classes.form}>
            <TextField variant="outlined" margin="normal" required fullWidth type="email" id="email" label={t("forms.user.email")} name="email" autoComplete="email" value={formData.email} autoFocus onChange={handleChangeEmail} onKeyDown={handleKeyDown} />
            <TextField variant="outlined" margin="normal" required fullWidth type="password" id="password" label={t("forms.user.password")} name="password" autoComplete="current-password" onChange={handleChangePassword} onKeyDown={handleKeyDown} />

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={sumbitForm}>{t("component.login-form.submit-button")}</Button>

            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2" onClick={() => history.push("/home")}>{t("component.login-form.home-redirect")}</Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2" onClick={() => history.push("/register")}>{t("component.login-form.register-redirect")}</Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LoginForm;