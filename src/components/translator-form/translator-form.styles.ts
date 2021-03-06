import { makeStyles } from '@material-ui/core/styles';

const useTranslatorFormStyles = makeStyles((theme) => ({
    form: {
      width: '100%',
      padding: theme.spacing(5),
      marginTop: '30%'
    },
    formSelect: {
      width: '100%'
    },
    submit: {
      margin: theme.spacing(1, 0, 2),
    },
}));

export default useTranslatorFormStyles;
