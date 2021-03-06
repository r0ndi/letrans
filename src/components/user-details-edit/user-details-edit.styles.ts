import { makeStyles } from '@material-ui/core/styles';

const useUserDetailsEditStyles = makeStyles((theme) => ({
    form: {
        width: "80%",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(4),
    },
    title: {
        color: '#173f5f',
        fontWeight: 'bold',
        marginTop: '50px',
        marginLeft: '30px',
        fontSize: '4vw'
    },
}));

export default useUserDetailsEditStyles;
