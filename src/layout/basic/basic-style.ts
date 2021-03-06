import { makeStyles } from '@material-ui/core/styles';

const useBasicStyles = makeStyles((theme) => ({
    pageContainer: {
      height: '100vh',
      flexWrap: 'wrap',
      display: 'flex'
    },
    leftSideBox: {
      padding: '50px !important',
      backgroundColor: "#f0f3f6",
      justifyContent: 'space-around'
    }
}));

export default useBasicStyles;
