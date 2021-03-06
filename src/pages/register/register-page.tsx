import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Copyright from '../../components/copyright/copyright';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import RegisterForm from '../../components/register-form/register-form';
import useRegisterPageStyles from './register-page.styles';
import { useTranslation } from 'react-i18next';
import Basic from '../../layout/basic/basic';

const RegisterPage = () => {
  const styles = useRegisterPageStyles();
  const { t } = useTranslation();

  return <Basic>
    <Container component="main" maxWidth="xs">
      <Box className={styles.paper}>
        <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
            {t("page.register.title")}
        </Typography>

        <RegisterForm />
      </Box>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  </Basic>;
}

export default RegisterPage;
