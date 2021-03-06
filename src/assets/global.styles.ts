import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useGlobalStyles = makeStyles((theme: Theme) =>
  createStyles({
    mt10: {
      marginTop: "10px"
    },
    mr10: {
      marginRight: "10px"
    },
    mt2l10: {
      marginTop: "20px",
      marginLeft: "10px"
    },
    link: {
      textTransform: "none",
      textDecoration: "none",
      color: "#000000"
    },
    whiteBackground: {
      backgroundColor: "#ffffff"
    }
  }),
);

export default useGlobalStyles;
