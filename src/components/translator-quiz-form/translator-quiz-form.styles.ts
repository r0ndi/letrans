import { makeStyles } from '@material-ui/core/styles';

const useTranslatiorQuizFormStyles = makeStyles((theme) => ({
    form: {
        width: "80%",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

export default useTranslatiorQuizFormStyles;
