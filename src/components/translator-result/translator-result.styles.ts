import { makeStyles } from '@material-ui/core/styles';

const useTranslatorResultStyles = makeStyles((theme) => ({
    mainContainer: {
      padding: 0
    },
    translation: {
      padding: theme.spacing(2)
    },
    translationSaveBtn: {
        margin: theme.spacing(1),
        marginTop: '10px'
    },
    extendedIcon: {
        marginRight: '3px',
        fontSize: '14px',
        marginTop: '-1'
    }
}));

export default useTranslatorResultStyles;

