import { makeStyles } from '@material-ui/core/styles';

const useApplicationTitleStyles = makeStyles((theme) => ({
    mainHeader: {
      color: '#173f5f',
      fontWeight: 'bold',
      marginTop: '30%',
      fontSize: '7vw'
    },
    headerDescription: {
      color: '#173f5f',
      fontWeight: 500,
      fontSize: '3vw'
    }
}));

export default useApplicationTitleStyles;
